import {casePaper, Prisma} from "@/generated/prisma";
import {casePaperRepository} from "@/data/repositories/casePaperRepository";

export function getPatientCasePaper(patientId: string): Promise<casePaper[]> {
    return casePaperRepository.getAll({where: {patientId}})
}

export async function getCasePapers(query?: Prisma.casePaperFindManyArgs){
    return casePaperRepository.getAll(query)
}

export async function getCasePaperById(id: string){
    return casePaperRepository.getOne({where: {id}})
}

export async function createCasePaper(data: Prisma.casePaperCreateArgs["data"]){
    return casePaperRepository.create(data)
}

export async function updateCasePaper(id: string, data: Prisma.casePaperUpdateArgs["data"]){
    return casePaperRepository.update({where: {id}}, data)
}

export async function deleteCasePaper(id: string){
    return casePaperRepository.delete({where: {id}})
}