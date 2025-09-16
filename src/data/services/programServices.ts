import {program, Prisma} from "@/generated/prisma";
import {programRepository} from "@/data/repositories/programRepository";

export function getPatientPrograms(patientId: string): Promise<program[]> {
    return programRepository.getAll({where: {patientId}})
}

export async function getPrograms(query?: Prisma.programFindManyArgs){
    return programRepository.getAll(query)
}

export async function getProgramById(id: string){
    return programRepository.getOne({where: {id}})
}

export async function createProgram(data: Prisma.programCreateArgs["data"]){
    return programRepository.create(data)
}

export async function updateProgram(id: string, data: Prisma.programUpdateArgs["data"]){
    return programRepository.update({where: {id}}, data)
}

export async function deleteProgram(id: string){
    return programRepository.delete({where: {id}})
}