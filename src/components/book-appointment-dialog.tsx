"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockPatients } from "@/lib/db"

interface BookAppointmentDialogProps {
  children: React.ReactNode
}

export function BookAppointmentDialog({ children }: BookAppointmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    duration: "30",
    type: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Appointment data:", formData)
    setOpen(false)
    // Reset form
    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      duration: "30",
      type: "",
      notes: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
          <DialogDescription>Schedule a new appointment for a patient.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient</Label>
            <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName} - {patient.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctorId">Doctor</Label>
            <Select value={formData.doctorId} onValueChange={(value) => handleInputChange("doctorId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr1">Dr. Smith - General Medicine</SelectItem>
                <SelectItem value="dr2">Dr. Johnson - Cardiology</SelectItem>
                <SelectItem value="dr3">Dr. Williams - Orthopedics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
              placeholder="Add any additional notes or special instructions..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Book Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
