import StatCard from "@/components/ui/stat-card";
import {Calendar, TrendingUp, Users} from "lucide-react";
import React from "react";

export default function StatsSection(){
    return(
        <>
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
        </>
    )
}