import {patient, appointment, progressNote, casePaper, program, Prisma} from "@/generated/prisma";


export type PatientWithRelations = Prisma.patientGetPayload<{
    include: {
        appointments: true,
        casePapers: true,
        programs: true,
        progressNotes: true
    }
}>