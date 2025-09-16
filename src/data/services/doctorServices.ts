// app/actions/getDoctorByEmail.ts
"use server"

import {prisma} from "@/lib/prisma"
import {doctorRepository} from "@/data/repositories/doctorRepository";

export async function getDoctorByEmail(email: string) {
    return doctorRepository.getOne({where: {email}})
}
