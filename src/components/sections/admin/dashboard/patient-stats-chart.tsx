"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { patient } from "@/generated/prisma"

type PatientChartData = {
    month: string
    newPatients: number
    totalPatients: number
}

export function PatientStatsChart({ patients }: { patients: patient[] | undefined }) {
    function getPatientsChartData(patients: { createdAt: Date }[] = []): PatientChartData[] {
        if (!patients || patients.length === 0) return []

        // Group by month (YYYY-MM format)
        const groups = patients.reduce<Record<string, number>>((acc, patient) => {
            const monthKey = new Date(patient.createdAt).toISOString().slice(0, 7) // "2025-09"
            acc[monthKey] = (acc[monthKey] ?? 0) + 1
            return acc
        }, {})

        // Convert groups into sorted array
        const sortedMonths = Object.keys(groups).sort()

        let cumulative = 0
        return sortedMonths.map((monthKey) => {
            const newPatients = groups[monthKey]
            cumulative += newPatients

            const formattedMonth = new Date(`${monthKey}-01`).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            })

            return {
                month: formattedMonth,
                newPatients,
                totalPatients: cumulative,
            }
        })
    }

    const data = getPatientsChartData(patients ?? [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Growth</CardTitle>
                <CardDescription>New patient registrations and total patient count over time</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                        <YAxis className="text-xs fill-muted-foreground" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="newPatients"
                            name="New Patients"
                            stackId="1"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.6}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalPatients"
                            name="Total Patients"
                            stackId="2"
                            stroke="hsl(var(--secondary))"
                            fill="hsl(var(--secondary))"
                            fillOpacity={0.4}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
