// app/actions/getDoctorByEmail.ts
"use server"

import { prisma } from "@/lib/prisma"

export async function getDoctorByEmail(email: string) {
    return prisma.doctors.findUnique({
        where: { email },
    })
}
