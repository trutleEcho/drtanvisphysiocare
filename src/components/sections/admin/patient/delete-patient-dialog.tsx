"use client"

import React, {useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {Separator} from "@/components/ui/separator"
import {deletePatient} from "@/data/services/patientServices"
import {toast} from "sonner"
import {AnimatedSubscribeButton} from "@/components/magicui/animated-subscribe-button"
import {patient} from "@/generated/prisma"
import {AlertTriangle, Trash2} from "lucide-react"

interface DeletePatientDialogProps {
  patient: patient
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeletePatientDialog({ props }: {props: DeletePatientDialogProps}) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      const result = await deletePatient(props.patient.id)

      if (!result) {
        toast.error("Failed to delete patient")
      } else {
        toast.success("Patient deleted successfully")
        props.onSuccess()
        props.onOpenChange(false)
      }
    } catch (error: any) {
      toast.error("Failed to delete patient:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Patient
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this patient? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Separator/>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-sm text-muted-foreground">Patient Details</h4>
            <div className="mt-2 space-y-1">
              <p className="font-medium">{props.patient.name}</p>
              <p className="text-sm text-muted-foreground">ID: {props.patient.id}</p>
              {props.patient.email && (
                <p className="text-sm text-muted-foreground">{props.patient.email}</p>
              )}
            </div>
          </div>

          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-destructive">Warning</p>
                <p className="text-muted-foreground">
                  This will permanently delete the patient and all associated records including:
                </p>
                <ul className="mt-1 text-xs text-muted-foreground list-disc list-inside">
                  <li>Appointments</li>
                  <li>Case papers</li>
                  <li>Progress notes</li>
                  <li>Programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => props.onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <AnimatedSubscribeButton 
            subscribeStatus={loading}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <span>Delete Patient</span>
            <span>Deleting...</span>
          </AnimatedSubscribeButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
