"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Patient } from "@/lib/db"
import { User, Phone, Mail, MapPin, Calendar, Heart, FileText, Edit, Clock, AlertTriangle } from "lucide-react"

interface PatientProfileProps {
  patient: Patient
}

export function PatientProfile({ patient }: PatientProfileProps) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {patient.firstName[0]}
              {patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-muted-foreground">
              Age {calculateAge(patient.dateOfBirth)} • Patient ID: {patient.id}
            </p>
            <div className="flex flex-wrap gap-2">
              {patient.medicalHistory.map((condition, index) => (
                <Badge key={index} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <span>{patient.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Born {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.emergencyContact.phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Visits</p>
                    <p className="text-2xl font-bold text-primary">24</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Visit</p>
                    <p className="text-2xl font-bold text-primary">5 days ago</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Documents</p>
                    <p className="text-2xl font-bold text-primary">12</p>
                  </div>
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Medical History & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medicalHistory.length > 0 ? (
                  patient.medicalHistory.map((condition, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium">{condition}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Diagnosed on {new Date(patient.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No medical history recorded.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Appointment history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Patient Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Patient documents will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
