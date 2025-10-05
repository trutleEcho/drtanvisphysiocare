"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, Mail, Calendar } from "lucide-react"
import { patient } from "@/generated/prisma"

export function PatientList({ patients }: { patients: patient[] }) {
    const router = useRouter()

    return (
        <div className="space-y-4">
            {patients &&
                patients.map((patient) => (
                    <div
                        key={patient.id}
                        onClick={() => router.push(`/a/n/patients/${patient.id}`)}
                        className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-card"
                    >
                        <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {patient.name[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div className="space-y-2 flex-1">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {patient.name}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {patient.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        {patient.phone}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Registered {new Date(patient.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}