import { prisma } from "@/lib/prisma"
import { doctor, Prisma } from "@/generated/prisma"
import Repository from "@/data/repositories/repository"

class DoctorRepository
    implements Repository<
        doctor,
        Prisma.doctorFindUniqueArgs,
        Prisma.doctorFindManyArgs,
        Prisma.doctorCountArgs,
        Prisma.doctorCreateArgs["data"],
        Prisma.doctorUpdateArgs["data"],
        Prisma.doctorUpsertArgs
    >
{
    async exists(query: Prisma.doctorFindUniqueArgs): Promise<boolean> {
        const result = await prisma.doctor.findUnique(query)
        return result !== null
    }

    async count(query?: Prisma.doctorCountArgs): Promise<number> {
        return prisma.doctor.count(query)
    }

    async getOne(query: Prisma.doctorFindUniqueArgs): Promise<doctor | null> {
        return prisma.doctor.findUnique(query)
    }

    async getAll(query?: Prisma.doctorFindManyArgs): Promise<doctor[]> {
        return prisma.doctor.findMany(query)
    }

    async create(data: Prisma.doctorCreateArgs["data"]): Promise<doctor> {
        return prisma.doctor.create({ data })
    }

    async update(
        query: Prisma.doctorFindUniqueArgs,
        data: Prisma.doctorUpdateArgs["data"]
    ): Promise<doctor> {
        return prisma.doctor.update({
            where: query.where,
            data,
        })
    }

    async upsert(query: Prisma.doctorUpsertArgs): Promise<doctor> {
        return prisma.doctor.upsert(query)
    }

    async delete(query: Prisma.doctorDeleteArgs): Promise<doctor> {
        return prisma.doctor.delete(query)
    }
}

export const doctorRepository = new DoctorRepository()