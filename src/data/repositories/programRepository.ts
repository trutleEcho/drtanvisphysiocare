import { prisma } from "@/lib/prisma"
import { program, Prisma } from "@/generated/prisma"
import Repository from "@/data/repositories/repository";

class ProgramRepository
    implements Repository<
        program,
        Prisma.programFindUniqueArgs,
        Prisma.programFindManyArgs,
        Prisma.programCountArgs,
        Prisma.programCreateArgs["data"],
        Prisma.programUpdateArgs["data"],
        Prisma.programUpsertArgs
    >
{
    async exists(query: Prisma.programFindUniqueArgs): Promise<boolean> {
        const result = await prisma.program.findUnique(query)
        return result !== null
    }

    async count(query?: Prisma.programCountArgs): Promise<number> {
        return prisma.program.count(query)
    }

    async getOne(query: Prisma.programFindUniqueArgs): Promise<program | null> {
        return prisma.program.findUnique(query)
    }

    async getAll(query?: Prisma.programFindManyArgs): Promise<program[]> {
        return prisma.program.findMany(query)
    }

    async create(data: Prisma.programCreateArgs["data"]): Promise<program> {
        return prisma.program.create({ data })
    }

    async update(
        query: Prisma.programFindUniqueArgs,
        data: Prisma.programUpdateArgs["data"]
    ): Promise<program> {
        return prisma.program.update({
            where: query.where,
            data,
        })
    }

    async upsert(query: Prisma.programUpsertArgs): Promise<program> {
        return prisma.program.upsert(query)
    }

    async delete(query: Prisma.programDeleteArgs): Promise<program> {
        return prisma.program.delete(query)
    }
}

export const programRepository = new ProgramRepository()