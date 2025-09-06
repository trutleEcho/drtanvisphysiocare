import { Suspense } from "react"
import { PatientList } from "@/components/patient-list"
import { PatientSearch } from "@/components/patient-search"
import { AddPatientDialog } from "@/components/add-patient-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PatientsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient profiles, medical history, and contact information</p>
        </div>
        <AddPatientDialog>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Patient
          </Button>
        </AddPatientDialog>
      </div>

      {/* Search and Filters */}
      <PatientSearch />

      {/* Patient List */}
      <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
        <PatientList />
      </Suspense>
    </div>
  )
}
