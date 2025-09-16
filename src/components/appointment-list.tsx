"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { appointment } from "@/generated/prisma"
import { Clock, User, Calendar, MoreHorizontal, Edit, Trash2, CheckCircle, Phone, Mail } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { appointmentApi, AppointmentWithRelations } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AppointmentListProps {
  appointments: AppointmentWithRelations[]
  onRefresh?: () => void
}

export function AppointmentList({ appointments, onRefresh }: AppointmentListProps) {
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      await appointmentApi.updateAppointment(appointmentId, { status: newStatus })
      toast.success(`Appointment ${newStatus.toLowerCase()} successfully`)
      onRefresh?.()
    } catch (error) {
      toast.error("Failed to update appointment status")
    }
  }

  const handleDelete = async (appointmentId: string) => {
    try {
      await appointmentApi.deleteAppointment(appointmentId)
      toast.success("Appointment deleted successfully")
      onRefresh?.()
    } catch (error) {
      toast.error("Failed to delete appointment")
    }
  }

  const handleViewPatient = (patientId: string) => {
    router.push(`/a/n/patients/${patientId}`)
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No appointments found</h3>
        <p className="text-muted-foreground">No appointments match your current filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        return (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {appointment.patient?.name?.slice(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {appointment.patient?.name || "Unknown Patient"}
                      </h3>
                      <p className="text-sm text-muted-foreground">Appointment ID: {appointment.id}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(appointment.dateTime), "PPP")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(appointment.dateTime), "p")}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {appointment.doctor?.name || "Dr. Unknown"}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      {appointment.patient?.phone && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {appointment.patient.phone}
                        </div>
                      )}
                      {appointment.patient?.email && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {appointment.patient.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleViewPatient(appointment.patientId)}
                    >
                      <User className="h-4 w-4" />
                      View Patient
                    </DropdownMenuItem>
                    {appointment.status.toLowerCase() !== "completed" && (
                      <DropdownMenuItem 
                        className="flex items-center gap-2"
                        onClick={() => handleStatusUpdate(appointment.id, "Completed")}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark Complete
                      </DropdownMenuItem>
                    )}
                    {appointment.status.toLowerCase() !== "cancelled" && (
                      <DropdownMenuItem 
                        className="flex items-center gap-2"
                        onClick={() => handleStatusUpdate(appointment.id, "Cancelled")}
                      >
                        <Edit className="h-4 w-4" />
                        Cancel Appointment
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
