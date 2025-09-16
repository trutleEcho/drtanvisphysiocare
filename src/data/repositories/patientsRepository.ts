import { prisma } from "@/lib/prisma"
import { patient, Prisma } from "@/generated/prisma"
import Repository from "@/data/repositories/repository"

class PatientRepository
    implements Repository<
        patient,
        Prisma.patientFindUniqueArgs,
        Prisma.patientFindManyArgs,
        Prisma.patientCountArgs,
        Prisma.patientCreateArgs["data"],
        Prisma.patientUpdateArgs["data"],
        Prisma.patientUpsertArgs
    >
{
    async exists(query: Prisma.patientFindUniqueArgs): Promise<boolean> {
        const result = await prisma.patient.findUnique(query)
        return result !== null
    }

    async count(query?: Prisma.patientCountArgs): Promise<number> {
        return prisma.patient.count(query)
    }

    async getOne(query: Prisma.patientFindUniqueArgs): Promise<patient | null> {
        return prisma.patient.findUnique(query)
    }

    async getAll(query?: Prisma.patientFindManyArgs): Promise<patient[]> {
        return prisma.patient.findMany(query)
    }

    async create(data: Prisma.patientCreateArgs["data"]): Promise<patient> {
        return prisma.patient.create({ data })
    }

    async update(
        query: Prisma.patientFindUniqueArgs,
        data: Prisma.patientUpdateArgs["data"]
    ): Promise<patient> {
        return prisma.patient.update({
            where: query.where,
            data,
        })
    }

    async upsert(query: Prisma.patientUpsertArgs): Promise<patient> {
        return prisma.patient.upsert(query)
    }

    async delete(query: Prisma.patientDeleteArgs): Promise<patient> {
        return prisma.patient.delete(query)
    }
}

export const patientRepository = new PatientRepository()