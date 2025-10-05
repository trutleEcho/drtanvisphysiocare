// app/actions/getDoctorByEmail.ts
"use server"
import { prisma } from "@/lib/prisma"

export async function getDoctorByEmail(email: string){
    return prisma?.doctor.findUnique(
        {
            where: {email}
            , include: {
                organization: true
            }
        })
}

export async function getDoctorDashboardData(id: string){
    return prisma?.doctor.findUnique({
        where: {id},
        include:{
            appointments: true,
            patients: true,
            progressNotes: true,
            programs: true,
            casePapers: true
        }
    })
}