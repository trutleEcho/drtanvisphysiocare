'use client'

import {Suspense, useEffect, useState} from "react"
import {PatientList} from "@/components/sections/admin/patient/patient-list"
import {PatientSearch} from "@/components/sections/admin/patient/patient-search"
import {AddPatientDialog} from "@/components/sections/admin/patient/add-patient-dialog"
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {ErrorBoundary} from "@/components/error-boundary";
import PageHeader from "@/components/composable/page-header";
import {toast} from "sonner";
import {getPatients} from "@/data/services/patientServices";
import {useAppSelector} from "@/lib/store";
import {patient} from "@/generated/prisma";

export default async function PatientsPage() {
    const doctor = useAppSelector((state) => state.doctor)

    const [patientsList, setPatientsList] = useState<patient[]>([])
    const [filteredPatients, setFilteredPatients] = useState<patient[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchPatients() {
        try {
            setLoading(true)
            const patients = await getPatients({
                where: {
                    doctorId: doctor.id
                }
            })
            console.log(patients)
            if (patients.length > 0) {
                setPatientsList(patients)
                setFilteredPatients(patients)
                toast.success("Patients Fetched")
            } else {
                setPatientsList([])
                setFilteredPatients([])
                toast.info("No Patients Found")
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (doctor?.id) {
            fetchPatients()
        }
    }, [doctor.id]) // runs only when doctor.id changes

    return (
        <>
            <PageHeader props={{
                title: "Patient Management",
                description: "Manage patient profiles, medical history, and contact information",
                breadcrumb: {
                    homeHref: "/a/n/dashboard",
                    pages: ["Patients"],
                    pagesHref: ["/a/n/patients"]
                },
                actions: <ErrorBoundary>
                    <AddPatientDialog props={{
                        doctorId: doctor.id,
                        refetch: fetchPatients,
                        children: <InteractiveHoverButton className="flex items-center gap-2">Add Patient</InteractiveHoverButton>
                    }}/>
                </ErrorBoundary>
            }}/>
            <div className="p-8 space-y-8">
                {/* Search and Filters */}
                <ErrorBoundary>
                    <PatientSearch props={{
                        refreshPatients: fetchPatients,
                        patients: patientsList,
                        onFilteredPatientsChange: setFilteredPatients
                    }}/>
                </ErrorBoundary>

                {/* Patient List */}
                <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse"/>}>
                    <ErrorBoundary>
                        <PatientList patients={filteredPatients}/>
                    </ErrorBoundary>
                </Suspense>
            </div>
        </>
    )
}
