"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {appointment, casePaper, patient, program, progressNote} from "@/generated/prisma"
import {
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Heart,
    FileText,
    Edit,
    Clock,
    Trash2, ArrowLeft, RefreshCcw, BarChart3,
} from "lucide-react"
import {format} from "date-fns"
import {useState, useCallback, useEffect} from "react"
import Link from "next/link";
import {LoaderOne} from "@/components/ui/loader";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {useRouter} from "next/navigation";
import StatCard from "@/components/ui/stat-card";
import {PatientStatsChart} from "@/components/sections/admin/dashboard/patient-stats-chart";
import {EditPatientDialog} from "@/components/sections/admin/patient/edit-patient-dialog";
import {DeletePatientDialog} from "@/components/sections/admin/patient/delete-patient-dialog";
import {PatientProfileSearch} from "@/components/sections/admin/patient/patient-profile-search";

interface PatientProfileProps {
    patient: patient
    appointments: appointment[]
    progressNotes: progressNote[]
    casePapers: casePaper[]
    programs: program[]
    onEdit?: (patient: patient) => void
    onDelete?: (id: string) => void
}

export function PatientProfile({props}: { props: PatientProfileProps }) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [filteredData, setFilteredData] = useState({
        appointments: props.appointments,
        casePapers: props.casePapers,
        programs: props.programs,
        progressNotes: props.progressNotes
    })

    // Update filtered data when props change
    useEffect(() => {
        setFilteredData({
            appointments: props.appointments,
            casePapers: props.casePapers,
            programs: props.programs,
            progressNotes: props.progressNotes
        })
    }, [props.appointments, props.casePapers, props.programs, props.progressNotes])


    function loadPatientData() {
        router.refresh()
    }

    const handleEdit = () => {
        setEditDialogOpen(true)
    }

    const handleDelete = () => {
        setDeleteDialogOpen(true)
    }

    const handleEditSuccess = () => {
        loadPatientData()
    }

    const handleDeleteSuccess = () => {
        router.push('/a/n/patients')
    }

    const handleFilteredDataChange = useCallback((data: {
        appointments: appointment[]
        casePapers: casePaper[]
        programs: program[]
        progressNotes: progressNote[]
    }) => {
        setFilteredData(data)
    }, [])

    return (
        <>
            <main className="space-y-6">
                {/* Header */}
                <Link href="/a/n/patients" className="flex items-center gap-2">
                    <ArrowLeft/>
                    Back to Patient List
                </Link>
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                                {props.patient.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-foreground">{props.patient.name}</h1>
                            <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                                <span>Patient ID: {props.patient.id}</span>
                                {props.patient.age && (
                                    <Badge variant="outline">Age {props.patient.age}</Badge>
                                )}
                                {props.patient.gender && (
                                    <Badge variant="secondary">{props.patient.gender}</Badge>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Last updated {format(new Date(props.patient.updatedAt), "PPP")}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <InteractiveHoverButton icon={<RefreshCcw className="animate-spin"/>} onClick={loadPatientData}>
                            Refresh
                        </InteractiveHoverButton>
                        <Button
                            variant="outline"
                            onClick={handleEdit}
                            className="flex items-center gap-2"
                        >
                            <Edit className="h-4 w-4"/>
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            className="flex items-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        >
                            <Trash2 className="h-4 w-4"/>
                            Delete
                        </Button>
                    </div>
                </div>

                {!isLoading ? (
                    <div className="space-y-6">
                        {/* Search and Filters */}
                        <PatientProfileSearch props={{
                            appointments: props.appointments,
                            casePapers: props.casePapers,
                            programs: props.programs,
                            progressNotes: props.progressNotes,
                            onFilteredDataChange: handleFilteredDataChange,
                            onRefresh: loadPatientData
                        }} />

                        {/* Tabs */}
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="medical">Medical History</TabsTrigger>
                                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>

                            {/* Overview */}
                            <TabsContent value="overview" className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Contact Information */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <User className="h-5 w-5" />
                                                Contact Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <InfoRow icon={<Mail />} text={props.patient.email} />
                                            <InfoRow icon={<Phone />} text={props.patient.phone} />
                                            <InfoRow icon={<MapPin />} text={props.patient.address} />
                                        </CardContent>
                                    </Card>

                                    {/* Chart */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <BarChart3 className="h-5 w-5" />
                                                Patient Stats
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <PatientStatsChart patients={[]}/>
                                        </CardContent>
                                    </Card>
                                </div>


                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <StatCard props={{
                                        title: "Total Visits",
                                        value: filteredData.appointments.length.toString(),
                                        icon: <Calendar/>,
                                        trend: "This month",
                                        trendValue: filteredData.appointments.length > 0 ? filteredData.appointments.filter((a) => a.createdAt > new Date(new Date().setMonth(new Date().getMonth() - 1))).length : 0,
                                        trendIsPercentage: false
                                    }}/>
                                    <StatCard props={{
                                        title: "Last Visit",
                                        value: filteredData.appointments.length > 0 ? format(new Date(filteredData.appointments[filteredData.appointments.length - 1].createdAt), "PP pp") : "N/A",
                                        icon: <Clock/>
                                    }}/>
                                    <StatCard props={{
                                        title: "Case Papers",
                                        value: filteredData.casePapers.length.toString(),
                                        icon: <FileText/>
                                    }}/>
                                </div>
                            </TabsContent>

                            {/* Medical History */}
                            <TabsContent value="medical">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Heart className="h-5 w-5"/>
                                            Medical History & Conditions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {filteredData.casePapers.length > 0 ? (
                                                filteredData.casePapers.map((cp, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-4 bg-muted rounded-lg"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="font-medium">{cp.diagnosis}</span>
                                                            <span className="text-sm text-muted-foreground">
                                                                {format(new Date(cp.createdAt), "PPP")}
                                                            </span>
                                                        </div>
                                                        {cp.history && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {cp.history}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted-foreground">No medical history recorded.</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Appointments */}
                            <TabsContent value="appointments">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Appointment History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {filteredData.appointments.length > 0 ? (
                                            <div className="space-y-3">
                                                {filteredData.appointments.map((appt, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex justify-between items-center border rounded-lg p-4"
                                                    >
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                                <span className="font-medium">
                                                                    {format(new Date(appt.dateTime), "PPP 'at' p")}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Badge 
                                                                    variant={
                                                                        appt.status === 'Completed' ? 'default' :
                                                                        appt.status === 'Scheduled' ? 'secondary' :
                                                                        'destructive'
                                                                    }
                                                                >
                                                                    {appt.status}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        <div className="text-right text-sm text-muted-foreground">
                                                            <p>Created {format(new Date(appt.createdAt), "MMM d, yyyy")}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">No appointments yet.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Documents */}
                            <TabsContent value="documents">
                                <div className="space-y-6">
                                    {/* Programs */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <FileText className="h-5 w-5"/>
                                                Treatment Programs
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {filteredData.programs.length > 0 ? (
                                                <div className="space-y-3">
                                                    {filteredData.programs.map((program, i) => (
                                                        <div
                                                            key={i}
                                                            className="p-4 bg-muted rounded-lg"
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-medium">{program.name}</h4>
                                                                {program.startDate && (
                                                                    <Badge variant="outline">
                                                                        {format(new Date(program.startDate), "MMM yyyy")}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            {program.description && (
                                                                <p className="text-sm text-muted-foreground mb-2">
                                                                    {program.description}
                                                                </p>
                                                            )}
                                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                {program.startDate && (
                                                                    <span>Start: {format(new Date(program.startDate), "PPP")}</span>
                                                                )}
                                                                {program.endDate && (
                                                                    <span>End: {format(new Date(program.endDate), "PPP")}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground">No treatment programs assigned.</p>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Progress Notes */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <FileText className="h-5 w-5"/>
                                                Progress Notes
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {filteredData.progressNotes.length > 0 ? (
                                                <div className="space-y-3">
                                                    {filteredData.progressNotes.map((note, i) => (
                                                        <div
                                                            key={i}
                                                            className="p-4 bg-muted rounded-lg"
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className="text-sm text-muted-foreground">
                                                                    {format(new Date(note.createdAt), "PPP")}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm mb-2">{note.note}</p>
                                                            {note.progress && (
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        Progress: {note.progress}
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground">No progress notes recorded.</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                ) : (
                    <LoaderOne/>
                )}

                {/* Edit Patient Dialog */}
                <EditPatientDialog props={{
                    patient: props.patient,
                    open: editDialogOpen,
                    onOpenChange: setEditDialogOpen,
                    onSuccess: handleEditSuccess
                }} />

                {/* Delete Patient Dialog */}
                <DeletePatientDialog props={{
                    patient: props.patient,
                    open: deleteDialogOpen,
                    onOpenChange: setDeleteDialogOpen,
                    onSuccess: handleDeleteSuccess
                }} />
            </main>
        </>
    )
}

/** Helper: InfoRow for contact details */
function InfoRow({icon, text}: { icon: React.ReactNode; text?: string | null }) {
    if (!text) return null
    return (
        <div className="flex items-center gap-3">
            <span className="h-4 w-4 text-muted-foreground">{icon}</span>
            <span>{text}</span>
        </div>
    )
}
