"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockAppointments, mockPatients } from "@/lib/db"
import { Clock, User, Calendar, MoreHorizontal, Edit, Trash2, CheckCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AppointmentList() {
  const [appointments] = useState(mockAppointments)

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-primary/10 text-primary"
      case "follow-up":
        return "bg-secondary/10 text-secondary"
      case "procedure":
        return "bg-orange-100 text-orange-800"
      case "emergency":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const patient = mockPatients.find((p) => p.id === appointment.patientId)

        return (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {patient?.firstName[0]}
                      {patient?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {patient?.firstName} {patient?.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground">Appointment ID: {appointment.id}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {appointment.time} ({appointment.duration} min)
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Dr. Smith
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <Badge className={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                    </div>

                    {appointment.notes && (
                      <p className="text-sm text-muted-foreground mt-2">Notes: {appointment.notes}</p>
                    )}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Reschedule
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Cancel
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
