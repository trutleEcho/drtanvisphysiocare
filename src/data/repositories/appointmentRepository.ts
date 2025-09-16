import { prisma } from "@/lib/prisma"
import { appointment, Prisma } from "@/generated/prisma"
import Repository from "@/data/repositories/repository"

class AppointmentRepository
    implements Repository<
        appointment,
        Prisma.appointmentFindUniqueArgs,
        Prisma.appointmentFindManyArgs,
        Prisma.appointmentCountArgs,
        Prisma.appointmentCreateArgs["data"],
        Prisma.appointmentUpdateArgs["data"],
        Prisma.appointmentUpsertArgs
    >
{
    async exists(query: Prisma.appointmentFindUniqueArgs): Promise<boolean> {
        const result = await prisma.appointment.findUnique(query)
        return result !== null
    }

    async count(query?: Prisma.appointmentCountArgs): Promise<number> {
        return prisma.appointment.count(query)
    }

    async getOne(query: Prisma.appointmentFindUniqueArgs): Promise<appointment | null> {
        return prisma.appointment.findUnique(query)
    }

    async getAll(query?: Prisma.appointmentFindManyArgs): Promise<appointment[]> {
        return prisma.appointment.findMany(query)
    }

    async create(data: Prisma.appointmentCreateArgs["data"]): Promise<appointment> {
        return prisma.appointment.create({ data })
    }

    async update(
        query: Prisma.appointmentFindUniqueArgs,
        data: Prisma.appointmentUpdateArgs["data"]
    ): Promise<appointment> {
        return prisma.appointment.update({
            where: query.where,
            data,
        })
    }

    async upsert(query: Prisma.appointmentUpsertArgs): Promise<appointment> {
        return prisma.appointment.upsert(query)
    }

    async delete(query: Prisma.appointmentDeleteArgs): Promise<appointment> {
        return prisma.appointment.delete(query)
    }
}

export const appointmentRepository = new AppointmentRepository()