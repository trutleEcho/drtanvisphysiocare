'use client'

import React, {Suspense, useEffect, useState} from "react"
import {PatientStatsChart} from "@/components/sections/admin/dashboard/patient-stats-chart"
import {AppointmentMetrics} from "@/components/sections/admin/dashboard/appointment-metrics"
import {RevenueChart} from "@/components/sections/admin/dashboard/revenue-chart"
import {RecentActivity} from "@/components/sections/admin/dashboard/recent-activity"
import PageHeader from "@/components/composable/page-header";
import StatsSection from "@/components/sections/admin/dashboard/stats-section";
import {ErrorBoundary} from "@/components/error-boundary";
import {createClient} from "@/lib/client";
import {getDoctorByEmail} from "@/lib/services/doctorServices";

export default function DashboardPage() {
    const [email, setEmail] = useState<string>("")
    const [doctor, setDoctor] = useState<any>(null)
    const [doctorError, setDoctorError] = useState<string | null>(null)
    const [loadingDoctor, setLoadingDoctor] = useState<boolean>(false)

    useEffect(() => {
        const supabase = createClient()
        let isCancelled = false

        async function load() {
            setLoadingDoctor(true)
            setDoctorError(null)
            try {
                const { data: auth } = await supabase.auth.getUser()
                const authedEmail = auth?.user?.email ?? ""
                if (!authedEmail) {
                    setEmail("")
                    setDoctorError("Not authenticated")
                    return
                }
                setEmail(authedEmail)

                const data = await getDoctorByEmail(authedEmail)
                console.log(`doctor data:`,data)
                if (!data) {
                    setDoctorError(`Doctor with email ${authedEmail} not found`)
                    return
                }

                if (!isCancelled) setDoctor(data)
            } catch (e: any) {
                if (!isCancelled) setDoctorError(e?.message ?? "Failed to load doctor")
            } finally {
                if (!isCancelled) setLoadingDoctor(false)
            }
        }

        load()
        return () => {
            isCancelled = true
        }
    }, [])


    return (
        <>
            <section className="min-h-screen bg-background">
                <PageHeader props={{
                    title: "Dashboard",
                    description: "Overview of your practice performance and patient metrics"
                }}/>

                <div className="p-8 space-y-8">
                    {loadingDoctor && (
                        <div className="text-sm text-muted-foreground">Loading doctor...</div>
                    )}
                    {!loadingDoctor && !email && (
                        <div className="text-sm text-red-500">No authenticated email found.</div>
                    )}
                    {!loadingDoctor && email && doctorError && (
                        <div className="text-sm text-red-500">{doctorError}</div>
                    )}
                    {!loadingDoctor && doctor && (
                        <div className="space-y-2">
                            <div
                                className="text-sm text-muted-foreground">Welcome, {doctor?.name ?? doctor?.email}</div>
                            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">{JSON.stringify({
                                email,
                                doctor
                            }, null, 2)}</pre>
                        </div>
                    )}
                    <ErrorBoundary>
                        <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                            <StatsSection/>
                        </Suspense>
                    </ErrorBoundary>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                        <ErrorBoundary>
                            <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                                <div
                                    className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <PatientStatsChart/>
                                </div>
                            </Suspense>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                                <div
                                    className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <AppointmentMetrics/>
                                </div>
                            </Suspense>
                        </ErrorBoundary>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        <div className="lg:col-span-2">
                            <ErrorBoundary>
                                <Suspense
                                    fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                                    <div
                                        className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                        <RevenueChart/>
                                    </div>
                                </Suspense>
                            </ErrorBoundary>
                        </div>

                        <ErrorBoundary>
                            <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                                <div
                                    className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <RecentActivity/>
                                </div>
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                </div>
            </section>
        </>
    )
}
