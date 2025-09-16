"use client"

import { Suspense, useEffect, useState } from "react"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { AppointmentList } from "@/components/appointment-list"
import { AddAppointmentDialog } from "@/components/add-appointment-dialog"
import { AppointmentFilters } from "@/components/appointment-filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, List } from "lucide-react"
import { appointmentApi, AppointmentWithRelations } from "@/lib/api"
import { useAppSelector } from "@/lib/store"
import { toast } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"
import PageHeader from "@/components/composable/page-header"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"

export default function AppointmentsPage() {
  const doctor = useAppSelector((state) => state.doctor)
  
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentWithRelations[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchAppointments() {
    try {
      setLoading(true)
      const appointmentsData = await appointmentApi.getAppointments(doctor.id)
      
      if (appointmentsData.length > 0) {
        setAppointments(appointmentsData)
        setFilteredAppointments(appointmentsData)
        toast.success("Appointments loaded successfully")
      } else {
        setAppointments([])
        setFilteredAppointments([])
        toast.info("No appointments found")
      }
    } catch (error: any) {
      toast.error("Failed to load appointments: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (doctor?.id) {
      fetchAppointments()
    }
  }, [doctor.id])

  const handleAppointmentClick = (appointment: AppointmentWithRelations) => {
    // Handle appointment click - could open a modal or navigate to details
    console.log("Appointment clicked:", appointment)
  }

  return (
    <>
      <PageHeader props={{
        title: "Appointment Management",
        description: "Schedule, manage, and track patient appointments",
        breadcrumb: {
          homeHref: "/a/n/dashboard",
          pages: ["Appointments"],
          pagesHref: ["/a/n/appointments"]
        },
        actions: (
          <ErrorBoundary>
            <AddAppointmentDialog onSuccess={fetchAppointments}>
              <InteractiveHoverButton className="flex items-center gap-2">
                Book Appointment
              </InteractiveHoverButton>
            </AddAppointmentDialog>
          </ErrorBoundary>
        )
      }} />

      <div className="p-8 space-y-8">
        {/* Filters */}
        <ErrorBoundary>
          <AppointmentFilters 
            appointments={appointments}
            onFilteredAppointmentsChange={setFilteredAppointments}
            onRefresh={fetchAppointments}
          />
        </ErrorBoundary>

        {/* Calendar and List Views */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
              <ErrorBoundary>
                <AppointmentCalendar 
                  appointments={filteredAppointments}
                  onAppointmentClick={handleAppointmentClick}
                />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>

          <TabsContent value="list">
            <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
              <ErrorBoundary>
                <AppointmentList 
                  appointments={filteredAppointments}
                  onRefresh={fetchAppointments}
                />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
