import {notFound} from "next/navigation"
import {PatientProfile} from "@/components/patient-profile"
import {mockPatients} from "@/lib/db"
import {getPatientById} from "@/data/services/patientServices";
import {getPatientAppointments} from "@/data/services/appointmentServices";
import {getPatientPrograms} from "@/data/services/programServices";
import {getPatientProgressNotes} from "@/data/services/progressNoteServices";
import {getPatientCasePaper} from "@/data/services/casePaperServices";

interface PatientDetailPageProps {
    params: {
        id: string
    }
}

export default async function PatientDetailPage({params}: PatientDetailPageProps) {
    const patient = await getPatientById(params.id)
    const appointments = await getPatientAppointments(params.id)
    const programs = await getPatientPrograms(params.id)
    const progressNotes = await getPatientProgressNotes(params.id)
    const casePaper = await getPatientCasePaper(params.id)


    if (!patient) {
        notFound()
    }

    return (
        <div className="p-6">
            <PatientProfile props={{
                patient: patient,
                appointments: appointments,
                progressNotes: progressNotes,
                casePapers: casePaper,
                programs: programs
            }}/>
        </div>
    )
}
