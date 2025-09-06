"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockAppointments, mockPatients } from "@/lib/db"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

export function AppointmentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return mockAppointments.filter((apt) => apt.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{monthYear}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {/* Week day headers */}
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-2 h-24" />
            }

            const appointments = getAppointmentsForDate(day)
            const isToday = day.toDateString() === new Date().toDateString()

            return (
              <div
                key={day.toISOString()}
                className={`p-2 h-24 border border-border rounded-lg hover:bg-muted/50 transition-colors ${
                  isToday ? "bg-primary/10 border-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                    {day.getDate()}
                  </span>
                  {appointments.length > 0 && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      {appointments.length}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  {appointments.slice(0, 2).map((appointment) => {
                    const patient = mockPatients.find((p) => p.id === appointment.patientId)
                    return (
                      <div
                        key={appointment.id}
                        className="text-xs p-1 bg-primary/20 rounded text-primary-foreground truncate"
                      >
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.time}
                        </div>
                        <div className="truncate">
                          {patient?.firstName} {patient?.lastName}
                        </div>
                      </div>
                    )
                  })}
                  {appointments.length > 2 && (
                    <div className="text-xs text-muted-foreground">+{appointments.length - 2} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
