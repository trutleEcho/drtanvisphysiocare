import StatCard from "@/components/ui/stat-card";
import {Calendar, TrendingUp, Users} from "lucide-react";
import React from "react";
import {DoctorDashboard} from "@/data/models/doctor/dashboard-data";
import {convertToCurrency} from "@/utils/currencyUtils";

export default function StatsSection({dashboardData}: {dashboardData: DoctorDashboard | undefined}){
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                <StatCard props={{
                    title: "Total Patients",
                    value: dashboardData?.patients?.length.toString() ?? "0",
                    icon: <Users className="h-5 w-5 text-primary"/>,
                    trend: "from last month",
                    trendValue: dashboardData?.patients?.filter((pat)=>pat.createdAt >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length ?? 0,
                    trendIsPercentage: false
                }}/>

                <StatCard props={{
                    title: "Today's Appointments",
                    value: dashboardData?.appointments?.filter((app)=>new Date(app.dateTime) >= new Date(Date.now() - 24 * 60 * 60 * 1000)).length.toString() ?? "0",
                    icon: <Calendar className="h-5 w-5 text-primary"/>,
                }}/>

                <StatCard props={{
                    title: "Programs",
                    value: dashboardData?.programs?.length.toString() ?? "0",
                    icon: <TrendingUp className="h-5 w-5 text-primary"/>,
                    trend: "from last month",
                    trendValue: dashboardData?.programs?.filter((prog)=>prog.createdAt >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length ?? 0,
                    trendIsPercentage: false
                }}/>

                <StatCard props={{
                    title: "Monthly Revenue",
                    value: convertToCurrency(dashboardData?.appointments?.filter((app)=>new Date(app.dateTime) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).reduce((a, b) => a + (b.consultationFee ?? 0), 0)),
                    icon: <TrendingUp className="h-5 w-5 text-primary"/>,
                    // trend: "from last month",
                    // trendValue: dashboardData?.appointments?.filter((app)=>new Date(app.dateTime) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).reduce((a, b) => a + (b.consultationFee ?? 0), 0) ?? 0,
                    // trendIsPercentage: true
                }}/>
            </div>
        </>
    )
}