"use server"

import { Prisma } from "@/generated/prisma";
import {patientRepository} from "@/data/repositories/patientsRepository";

export async function getPatients(query?: Prisma.patientFindManyArgs){
    return patientRepository.getAll(query)
}

export async function getPatientById(id: string){
    return patientRepository.getOne({where: {id}})
}

export async function createPatient(data: Prisma.patientCreateArgs["data"]){
    return patientRepository.create(data)
}

export async function updatePatient(id: string, data: Prisma.patientUpdateArgs["data"]){
    return patientRepository.update({where: {id}}, data)
}

export async function deletePatient(id: string){
    return patientRepository.delete({where: {id}})
}

export async function searchPatients(query: string, doctorId?: string){
    return patientRepository.getAll({
        where: {
            ...(doctorId && { doctorId }),
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
                { phone: { contains: query, mode: 'insensitive' } },
                { address: { contains: query, mode: 'insensitive' } }
            ]
        }
    })
}

export async function getPatientsWithRelations(doctorId?: string){
    return patientRepository.getAll({
        where: doctorId ? { doctorId } : undefined,
        include: {
            appointments: true,
            casePapers: true,
            programs: true,
            progressNotes: true
        }
    })
}