import { prisma } from "@/lib/prisma"
import { casePaper, Prisma } from "@/generated/prisma"
import Repository from "@/data/repositories/repository"

class CasePaperRepository
    implements Repository<
        casePaper,
        Prisma.casePaperFindUniqueArgs,
        Prisma.casePaperFindManyArgs,
        Prisma.casePaperCountArgs,
        Prisma.casePaperCreateArgs["data"],
        Prisma.casePaperUpdateArgs["data"],
        Prisma.casePaperUpsertArgs
    >
{
    async exists(query: Prisma.casePaperFindUniqueArgs): Promise<boolean> {
        const result = await prisma.casePaper.findUnique(query)
        return result !== null
    }

    async count(query?: Prisma.casePaperCountArgs): Promise<number> {
        return prisma.casePaper.count(query)
    }

    async getOne(query: Prisma.casePaperFindUniqueArgs): Promise<casePaper | null> {
        return prisma.casePaper.findUnique(query)
    }

    async getAll(query?: Prisma.casePaperFindManyArgs): Promise<casePaper[]> {
        return prisma.casePaper.findMany(query)
    }

    async create(data: Prisma.casePaperCreateArgs["data"]): Promise<casePaper> {
        return prisma.casePaper.create({ data })
    }

    async update(
        query: Prisma.casePaperFindUniqueArgs,
        data: Prisma.casePaperUpdateArgs["data"]
    ): Promise<casePaper> {
        return prisma.casePaper.update({
            where: query.where,
            data,
        })
    }

    async upsert(query: Prisma.casePaperUpsertArgs): Promise<casePaper> {
        return prisma.casePaper.upsert(query)
    }

    async delete(query: Prisma.casePaperDeleteArgs): Promise<casePaper> {
        return prisma.casePaper.delete(query)
    }
}

export const casePaperRepository = new CasePaperRepository()