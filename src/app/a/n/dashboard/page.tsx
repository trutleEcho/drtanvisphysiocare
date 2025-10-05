'use client'

import React, {Suspense, useEffect, useState} from "react"
import {PatientStatsChart} from "@/components/sections/admin/dashboard/patient-stats-chart"
import {AppointmentMetrics} from "@/components/sections/admin/dashboard/appointment-metrics"
import {RevenueChart} from "@/components/sections/admin/dashboard/revenue-chart"
import {RecentActivity} from "@/components/sections/admin/dashboard/recent-activity"
import PageHeader from "@/components/composable/page-header";
import StatsSection from "@/components/sections/admin/dashboard/stats-section";
import {ErrorBoundary} from "@/components/error-boundary";
import {useAppSelector} from "@/lib/store";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {DoctorDashboard} from "@/data/models/doctor/dashboard-data";

export default function DashboardPage() {
    const doctor = useAppSelector((state) => state.doctor)
    const router = useRouter()

    const [isLoading,setIsLoading] = useState(false)
    const [dashboardData,setDashboardData] = useState<DoctorDashboard>()

    async function fetchDashboardData() {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/dashboard?id=${doctor.id}`)
            const data : DoctorDashboard = await response.json()
            setDashboardData(data)

            if (data) {
                toast.success("Dashboard Data Fetched")
            } else {
                toast.error("Dashboard Data Not Found")
            }

        } catch (error: any) {
            toast.error("Failed to load program: " + error.message)
            router.push("/a/n/programs")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (doctor.id){
            fetchDashboardData()
        }
    }, [doctor.id]);

    return (
        <>
            <section className="min-h-screen bg-background">
                <PageHeader props={{
                    title: "Dashboard",
                    description: "Overview of your practice performance and patient metrics"
                }}/>

                <div className="p-8 space-y-8">
                    {doctor && (
                        <div className="space-y-2">
                            <div
                                className="text-sm text-muted-foreground">Welcome, {doctor?.name ?? doctor?.email}</div>
                        </div>
                    )}
                    <ErrorBoundary>
                        <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                            <StatsSection dashboardData={dashboardData}/>
                        </Suspense>
                    </ErrorBoundary>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                        <ErrorBoundary>
                            <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                                <div
                                    className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <PatientStatsChart patients={[]}/>
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
