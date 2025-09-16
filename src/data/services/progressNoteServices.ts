import {progressNote} from "@/generated/prisma";
import {progressNoteRepository} from "@/data/repositories/progressNotesRepository";

export function getPatientProgressNotes(patientId: string): Promise<progressNote[]> {
    return progressNoteRepository.getAll({where: {patientId}})
}