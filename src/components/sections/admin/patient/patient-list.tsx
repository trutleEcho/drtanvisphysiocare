"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Phone,
  Mail,
  Calendar,
  MoreHorizontal,
  Edit,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { patient } from "@/generated/prisma"

import {
  Expandable,
  ExpandableCard,
  ExpandableCardHeader,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableTrigger,
  ExpandableContent,
} from "@/components/ui/expandable"
import {useRouter} from "next/navigation";

export function PatientList({ patients }: { patients: patient[] }) {

  const router = useRouter()

  return (
      <div className="space-y-4">
        {patients &&
            patients.map((patient) => (
                <Expandable key={patient.id}>
                  {({ isExpanded }) => (
                      <ExpandableTrigger>
                        <ExpandableCard className="hover:shadow-md transition-shadow">
                          {/* Card Header */}
                          <ExpandableCardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {patient.name[0]}
                                  </AvatarFallback>
                                </Avatar>

                                <div className="space-y-2">
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
                                      Registered{" "}
                                      {new Date(patient.createdAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ExpandableCardHeader>
                          {/* Expandable Content */}
                          <ExpandableContent className="p-6 pt-0">
                            <p className="text-sm text-muted-foreground">
                              <strong>Address:</strong>{" "}
                              {patient.address || "No address available"}
                            </p>
                          </ExpandableContent>

                          {/* Expandable Footer */}
                          <ExpandableCardFooter>
                            <div className="flex justify-between w-full">
                              <Button variant="secondary" size="sm">
                                Quick Appointment
                              </Button>
                              <Button variant="default" size="sm" onClick={() => router.push(`/a/n/patients/${patient.id}`)}>
                                View Full Profile
                              </Button>
                            </div>
                          </ExpandableCardFooter>
                        </ExpandableCard>
                      </ExpandableTrigger>
                  )}
                </Expandable>
            ))}
      </div>
  )
}
