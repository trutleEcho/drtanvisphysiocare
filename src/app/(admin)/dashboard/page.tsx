import React, {Suspense} from "react"
import {PatientStatsChart} from "@/components/sections/admin/dashboard/patient-stats-chart"
import {AppointmentMetrics} from "@/components/sections/admin/dashboard/appointment-metrics"
import {RevenueChart} from "@/components/sections/admin/dashboard/revenue-chart"
import {RecentActivity} from "@/components/sections/admin/dashboard/recent-activity"
import {Users, Calendar, FileText, TrendingUp} from "lucide-react"
import PageHeader from "@/components/composable/page-header";
import StatCard from "@/components/ui/stat-card";
import StatsSection from "@/components/sections/admin/dashboard/stats-section";
import {ErrorBoundary} from "@/components/error-boundary";

export default function DashboardPage() {
    return (
        <>
            <section className="min-h-screen bg-background">
                <PageHeader props={{
                    title: "Dashboard",
                    description: "Overview of your practice performance and patient metrics"
                }}/>

                <div className="p-8 space-y-8">
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
