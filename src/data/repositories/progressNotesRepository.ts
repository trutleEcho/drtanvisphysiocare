import { prisma } from "@/lib/prisma"
import { progressNote, Prisma } from "@/generated/prisma"
import Repository from "@/data/repositories/repository"

class ProgressNoteRepository
    implements Repository<
        progressNote,
        Prisma.progressNoteFindUniqueArgs,
        Prisma.progressNoteFindManyArgs,
        Prisma.progressNoteCountArgs,
        Prisma.progressNoteCreateArgs["data"],
        Prisma.progressNoteUpdateArgs["data"],
        Prisma.progressNoteUpsertArgs
    >
{
    async exists(query: Prisma.progressNoteFindUniqueArgs): Promise<boolean> {
        const result = await prisma.progressNote.findUnique(query)
        return result !== null
    }

    async count(query?: Prisma.progressNoteCountArgs): Promise<number> {
        return prisma.progressNote.count(query)
    }

    async getOne(query: Prisma.progressNoteFindUniqueArgs): Promise<progressNote | null> {
        return prisma.progressNote.findUnique(query)
    }

    async getAll(query?: Prisma.progressNoteFindManyArgs): Promise<progressNote[]> {
        return prisma.progressNote.findMany(query)
    }

    async create(data: Prisma.progressNoteCreateArgs["data"]): Promise<progressNote> {
        return prisma.progressNote.create({ data })
    }

    async update(
        query: Prisma.progressNoteFindUniqueArgs,
        data: Prisma.progressNoteUpdateArgs["data"]
    ): Promise<progressNote> {
        return prisma.progressNote.update({
            where: query.where,
            data,
        })
    }

    async upsert(query: Prisma.progressNoteUpsertArgs): Promise<progressNote> {
        return prisma.progressNote.upsert(query)
    }

    async delete(query: Prisma.progressNoteDeleteArgs): Promise<progressNote> {
        return prisma.progressNote.delete(query)
    }
}

export const progressNoteRepository = new ProgressNoteRepository()