import {appointment, casePaper, patient, program, progressNote} from "@/generated/prisma";
import {Doctor} from "@/data/models/doctor/doctor";

export interface DoctorDashboard extends Doctor{
    appointments: appointment[]
    casePapers: casePaper[]
    patients: patient[]
    programs: program[]
    progressNotes: progressNote[]
}