"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockPatients } from "@/lib/db"
import { Phone, Mail, Calendar, MoreHorizontal, Edit, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function PatientList() {
  const [patients] = useState(mockPatients)

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <Card key={patient.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {patient.firstName[0]}
                    {patient.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Age {calculateAge(patient.dateOfBirth)} • Patient ID: {patient.id}
                    </p>
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

                  {patient.medicalHistory.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {patient.medicalHistory.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/patients/${patient.id}`} className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Patient
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Appointment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
