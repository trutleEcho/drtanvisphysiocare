import { prisma } from "@/lib/prisma"
import { organization, Prisma } from "@/generated/prisma"
import Repository from "@/data/repositories/repository"

class OrganizationRepository
    implements Repository<
        organization,
        Prisma.organizationFindUniqueArgs,
        Prisma.organizationFindManyArgs,
        Prisma.organizationCountArgs,
        Prisma.organizationCreateArgs["data"],
        Prisma.organizationUpdateArgs["data"],
        Prisma.organizationUpsertArgs
    >
{
    async exists(query: Prisma.organizationFindUniqueArgs): Promise<boolean> {
        const result = await prisma.organization.findUnique(query)
        return result !== null
    }

    async count(query?: Prisma.organizationCountArgs): Promise<number> {
        return prisma.organization.count(query)
    }

    async getOne(query: Prisma.organizationFindUniqueArgs): Promise<organization | null> {
        return prisma.organization.findUnique(query)
    }

    async getAll(query?: Prisma.organizationFindManyArgs): Promise<organization[]> {
        return prisma.organization.findMany(query)
    }

    async create(data: Prisma.organizationCreateArgs["data"]): Promise<organization> {
        return prisma.organization.create({ data })
    }

    async update(
        query: Prisma.organizationFindUniqueArgs,
        data: Prisma.organizationUpdateArgs["data"]
    ): Promise<organization> {
        return prisma.organization.update({
            where: query.where,
            data,
        })
    }

    async upsert(query: Prisma.organizationUpsertArgs): Promise<organization> {
        return prisma.organization.upsert(query)
    }

    async delete(query: Prisma.organizationDeleteArgs): Promise<organization> {
        return prisma.organization.delete(query)
    }
}

export const organizationRepository = new OrganizationRepository()