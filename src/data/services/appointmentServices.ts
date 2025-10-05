import {appointment, Prisma} from "@/generated/prisma";
import {appointmentRepository} from "@/data/repositories/appointmentRepository";

export function getPatientAppointments(patientId:string): Promise<appointment[]> {
    return appointmentRepository.getAll({where: {patientId}})
}

export async function getAppointments(query?: Prisma.appointmentFindManyArgs){
    return appointmentRepository.getAll(query)
}

export async function getAppointmentById(id: string){
    return appointmentRepository.getOne({where: {id}})
}

export async function createAppointment(data: Prisma.appointmentCreateArgs["data"]){
    return appointmentRepository.create(data)
}

export async function updateAppointment(id: string, data: Prisma.appointmentUpdateArgs["data"]){
    return appointmentRepository.update({where: {id}}, data)
}

export async function deleteAppointment(id: string){
    return appointmentRepository.delete({where: {id}})
}

export async function searchAppointments(query: string, doctorId?: string){
    return appointmentRepository.getAll({
        where: {
            ...(doctorId && { doctorId }),
            OR: [
                { status: { contains: query, mode: 'insensitive' } },
                { patient: { name: { contains: query, mode: 'insensitive' } } }
            ]
        },
        include: {
            patient: true,
            doctor: true
        }
    })
}

export async function getAppointmentsWithRelations(doctorId: string){
    return appointmentRepository.getAll({
        where: {doctorId: doctorId},
        include: {
            patient: true,
            doctor: true
        },
        orderBy: {
            dateTime: 'asc'
        }
    })
}

export async function getAppointmentsByDateRange(startDate: Date, endDate: Date, doctorId?: string){
    return appointmentRepository.getAll({
        where: {
            ...(doctorId && { doctorId }),
            dateTime: {
                gte: startDate,
                lte: endDate
            }
        },
        include: {
            patient: true,
            doctor: true
        },
        orderBy: {
            dateTime: 'asc'
        }
    })
}