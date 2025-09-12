import { notFound } from "next/navigation"
import { PatientProfile } from "@/components/patient-profile"
import { mockPatients } from "@/lib/db"

interface PatientDetailPageProps {
  params: {
    id: string
  }
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const patient = mockPatients.find((p) => p.id === params.id)

  if (!patient) {
    notFound()
  }

  return (
    <div className="p-6">
      <PatientProfile patient={patient} />
    </div>
  )
}
