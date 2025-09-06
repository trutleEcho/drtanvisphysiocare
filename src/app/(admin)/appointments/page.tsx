import { Suspense } from "react"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { AppointmentList } from "@/components/appointment-list"
import { BookAppointmentDialog } from "@/components/book-appointment-dialog"
import { AppointmentFilters } from "@/components/appointment-filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, List } from "lucide-react"

export default function AppointmentsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Appointment Management</h1>
          <p className="text-muted-foreground">Schedule, manage, and track patient appointments</p>
        </div>
        <BookAppointmentDialog>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Book Appointment
          </Button>
        </BookAppointmentDialog>
      </div>

      {/* Filters */}
      <AppointmentFilters />

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
            <AppointmentCalendar />
          </Suspense>
        </TabsContent>

        <TabsContent value="list">
          <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
            <AppointmentList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
