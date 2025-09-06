import React, {Suspense} from "react"
import {PatientStatsChart} from "@/components/sections/admin/dashboard/patient-stats-chart"
import {AppointmentMetrics} from "@/components/sections/admin/dashboard/appointment-metrics"
import {RevenueChart} from "@/components/sections/admin/dashboard/revenue-chart"
import {RecentActivity} from "@/components/sections/admin/dashboard/recent-activity"
import {Users, Calendar, FileText, TrendingUp} from "lucide-react"
import PageHeader from "@/components/composable/page-header";
import StatCard from "@/components/ui/stat-card";

export default function DashboardPage() {
    return (
        <>
            <section className="min-h-screen bg-background">
                <PageHeader props={{
                    title: "Dashboard",
                    description: "Overview of your practice performance and patient metrics"
                }}/>

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                        <StatCard props={{
                            title: "Total Patients",
                            value: "1,247",
                            icon: <Users className="h-5 w-5 text-primary"/>,
                            trend: "from last month",
                            trendValue: 12,
                            trendIsPercentage: true
                        }}/>

                        <StatCard props={{
                            title: "Today's Appointments",
                            value: "24",
                            icon: <Calendar className="h-5 w-5 text-primary"/>,
                            trend: "from last month",
                            trendValue: 8,
                            trendIsPercentage: true
                        }}/>

                        <StatCard props={{
                            title: "Monthly Revenue",
                            value: "$45,231",
                            icon: <TrendingUp className="h-5 w-5 text-primary"/>,
                            trend: "from last month",
                            trendValue: 8,
                            trendIsPercentage: true
                        }}/>

                        <StatCard props={{
                            title: "Monthly Revenue",
                            value: "$45,231",
                            icon: <TrendingUp className="h-5 w-5 text-primary"/>,
                            trend: "from last month",
                            trendValue: 8,
                            trendIsPercentage: true
                        }}/>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                        <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                            <div className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <PatientStatsChart/>
                            </div>
                        </Suspense>

                        <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                            <div className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <AppointmentMetrics/>
                            </div>
                        </Suspense>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        <div className="lg:col-span-2">
                            <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                                <div className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <RevenueChart/>
                                </div>
                            </Suspense>
                        </div>

                        <Suspense fallback={<div className="h-96 bg-card rounded-2xl animate-pulse shadow-lg"/>}>
                            <div className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <RecentActivity/>
                            </div>
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    )
}
