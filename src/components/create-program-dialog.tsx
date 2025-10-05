"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { programApi, patientApi } from "@/lib/api"
import { useAppSelector } from "@/lib/store"
import { toast } from "sonner"
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"

interface CreateProgramDialogProps {
  children: React.ReactNode
  onSuccess?: () => void
}

interface Exercise {
  id: string
  name: string
  description: string
  sets: number
  reps: number
  duration: number
  instructions: string[]
}

export function CreateProgramDialog({ children, onSuccess }: CreateProgramDialogProps) {
  const doctor = useAppSelector((state) => state.doctor)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isGeneric: true,
    patientId: "",
    startDate: "",
    endDate: "",
  })
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExercise, setCurrentExercise] = useState({
    name: "",
    description: "",
    sets: "",
    reps: "",
    duration: "",
    instructions: "",
  })

  useEffect(() => {
    if (open && doctor.id) {
      fetchPatients()
    }
  }, [open, doctor.id])

  const fetchPatients = async () => {
    try {
      const patientsData = await patientApi.getPatients(doctor.id)
      setPatients(patientsData)
    } catch (error) {
      console.error("Failed to fetch patients:", error)
      toast.error("Failed to load patients")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error("Program name is required")
      return
    }

    if (!formData.isGeneric && !formData.patientId) {
      toast.error("Please select a patient for patient-specific programs")
      return
    }

    try {
      setLoading(true)
      const organizationId = "org1" // This should come from doctor's organization
      
      const programData = {
        organizationId,
        name: formData.name,
        description: formData.description || undefined,
        patientId: formData.isGeneric ? undefined : formData.patientId,
        startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        isGeneric: formData.isGeneric
      }

      const newProgram = await programApi.createProgram(programData)
      
      if (newProgram) {
        toast.success("Program created successfully!")
        setOpen(false)
        onSuccess?.()
        
        // Reset form
        setFormData({
          name: "",
          description: "",
          isGeneric: true,
          patientId: "",
          startDate: "",
          endDate: "",
        })
        setExercises([])
      } else {
        toast.error("Failed to create program")
      }
    } catch (error: any) {
      console.error("Error creating program:", error)
      toast.error("Failed to create program: " + (error.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleExerciseChange = (field: string, value: string) => {
    setCurrentExercise((prev) => ({ ...prev, [field]: value }))
  }

  const addExercise = () => {
    if (currentExercise.name.trim()) {
      const newExercise: Exercise = {
        id: Date.now().toString(),
        name: currentExercise.name,
        description: currentExercise.description,
        sets: Number.parseInt(currentExercise.sets) || 0,
        reps: Number.parseInt(currentExercise.reps) || 0,
        duration: Number.parseInt(currentExercise.duration) || 0,
        instructions: currentExercise.instructions.split("\n").filter((i) => i.trim()),
      }
      setExercises((prev) => [...prev, newExercise])
      setCurrentExercise({
        name: "",
        description: "",
        sets: "",
        reps: "",
        duration: "",
        instructions: "",
      })
    }
  }

  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Program</DialogTitle>
          <DialogDescription>Create a new treatment program or training plan for your patients.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Program Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Program Details</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter program name..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  placeholder="Enter program description..."
                />
              </div>

              <div className="space-y-2">
                <Label>Program Type</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={formData.isGeneric}
                      onChange={() => handleInputChange("isGeneric", "true")}
                      className="rounded"
                    />
                    <span>Generic (can be applied to multiple patients)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={!formData.isGeneric}
                      onChange={() => handleInputChange("isGeneric", "false")}
                      className="rounded"
                    />
                    <span>Patient-Specific</span>
                  </label>
                </div>
              </div>

              {!formData.isGeneric && (
                <div className="space-y-2">
                  <Label htmlFor="patientId">Select Patient</Label>
                  <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} - {patient.email || patient.phone || "No contact info"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Add Exercise Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add Exercise</h3>

              <div className="space-y-2">
                <Label htmlFor="exerciseName">Exercise Name</Label>
                <Input
                  id="exerciseName"
                  value={currentExercise.name}
                  onChange={(e) => handleExerciseChange("name", e.target.value)}
                  placeholder="Enter exercise name..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exerciseDescription">Description</Label>
                <Textarea
                  id="exerciseDescription"
                  value={currentExercise.description}
                  onChange={(e) => handleExerciseChange("description", e.target.value)}
                  rows={2}
                  placeholder="Exercise description..."
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="sets">Sets</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={currentExercise.sets}
                    onChange={(e) => handleExerciseChange("sets", e.target.value)}
                    placeholder="3"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reps">Reps</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={currentExercise.reps}
                    onChange={(e) => handleExerciseChange("reps", e.target.value)}
                    placeholder="10"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exerciseDuration">Duration (min)</Label>
                  <Input
                    id="exerciseDuration"
                    type="number"
                    value={currentExercise.duration}
                    onChange={(e) => handleExerciseChange("duration", e.target.value)}
                    placeholder="5"
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions (one per line)</Label>
                <Textarea
                  id="instructions"
                  value={currentExercise.instructions}
                  onChange={(e) => handleExerciseChange("instructions", e.target.value)}
                  rows={3}
                  placeholder="Step 1: Position yourself...&#10;Step 2: Begin the movement...&#10;Step 3: Return to starting position..."
                />
              </div>

              <Button type="button" onClick={addExercise} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>
          </div>

          {/* Exercise List */}
          {exercises.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Program Exercises ({exercises.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                {exercises.map((exercise) => (
                  <Card key={exercise.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm">{exercise.name}</CardTitle>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeExercise(exercise.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-2">{exercise.description}</p>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="outline">{exercise.sets} sets</Badge>
                        <Badge variant="outline">{exercise.reps} reps</Badge>
                        <Badge variant="outline">{exercise.duration} min</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <AnimatedSubscribeButton subscribeStatus={loading}>
              <span>Create Program</span>
              <span>Creating...</span>
            </AnimatedSubscribeButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
