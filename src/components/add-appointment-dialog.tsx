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
import { appointmentApi, patientApi, AppointmentWithRelations } from "@/lib/api"
import { useAppSelector } from "@/lib/store"
import { toast } from "sonner"
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"
import { patient } from "@/generated/prisma"
import { useEffect } from "react"

interface BookAppointmentDialogProps {
  children: React.ReactNode
  onSuccess?: () => void
}

export function AddAppointmentDialog({ children, onSuccess }: BookAppointmentDialogProps) {
  const doctor = useAppSelector((state) => state.doctor)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState<patient[]>([])
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: doctor.id || "",
    date: "",
    time: "",
    duration: "30",
    type: "",
    notes: "",
  })

  // Fetch patients when dialog opens
  useEffect(() => {
    if (open && doctor.id) {
      fetchPatients()
    }
  }, [open, doctor.id])

  const fetchPatients = async () => {
    try {
      const patientsData = await patientApi.getPatients(doctor.id)
      setPatients(patientsData as patient[])
    } catch (error) {
      console.error("Failed to fetch patients:", error)
      toast.error("Failed to load patients")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.patientId || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      
      // Combine date and time into a single DateTime
      const dateTime = new Date(`${formData.date}T${formData.time}:00`)
      
      // Create appointment data
      const appointmentData = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        dateTime: dateTime,
        status: "Scheduled"
      }

      const newAppointment = await appointmentApi.createAppointment(appointmentData)
      
      if (newAppointment) {
        toast.success("Appointment booked successfully!")
        setOpen(false)
        onSuccess?.()
        
        // Reset form
        setFormData({
          patientId: "",
          doctorId: doctor.id || "",
          date: "",
          time: "",
          duration: "30",
          type: "",
          notes: "",
        })
      } else {
        toast.error("Failed to create appointment")
      }
    } catch (error: any) {
      console.error("Error creating appointment:", error)
      toast.error("Failed to book appointment: " + (error.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
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
            <Select value={formData.patientId}  onValueChange={(value) => handleInputChange("patientId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} - {patient.phone || "No contact info"}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No patients found
                  </SelectItem>
                )}
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
                <SelectTrigger  className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <AnimatedSubscribeButton subscribeStatus={loading}>
              <span>Book Appointment</span>
              <span>Booking...</span>
            </AnimatedSubscribeButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
