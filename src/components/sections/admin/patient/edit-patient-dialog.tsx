"use client"

import React, {useEffect} from "react"
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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Separator} from "@/components/ui/separator"
import {updatePatient} from "@/data/services/patientServices"
import {toast} from "sonner"
import {AnimatedSubscribeButton} from "@/components/magicui/animated-subscribe-button"
import {patient} from "@/generated/prisma"

interface EditPatientDialogProps {
  patient: patient
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditPatientDialog({ props }: {props: EditPatientDialogProps}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    if (props.patient) {
      setFormData({
        name: props.patient.name || "",
        age: props.patient.age?.toString() || "",
        gender: props.patient.gender || "",
        email: props.patient.email || "",
        phone: props.patient.phone || "",
        address: props.patient.address || "",
      })
    }
  }, [props.patient])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const updatedPatient = await updatePatient(props.patient.id, {
        name: formData.name,
        age: Number(formData.age) || null,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      })

      if (!updatedPatient) {
        toast.error("Failed to update patient")
      } else {
        toast.success("Patient updated successfully")
        props.onSuccess()
        props.onOpenChange(false)
      }
    } catch (error: any) {
      toast.error("Failed to update patient:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogDescription>Update the patient's information.</DialogDescription>
        </DialogHeader>

        <Separator/>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="mandatory">Full Name</Label>
              <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => props.onOpenChange(false)}>
              Cancel
            </Button>
            <AnimatedSubscribeButton subscribeStatus={loading}>
              <span>Update Patient</span>
              <span>Updating...</span>
            </AnimatedSubscribeButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
