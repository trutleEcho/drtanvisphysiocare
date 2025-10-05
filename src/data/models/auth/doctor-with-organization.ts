import {Prisma} from "@/generated/prisma";

export type DoctorWithOrganization = Prisma.doctorGetPayload<{
    include: {
        organization: true
    }
}>