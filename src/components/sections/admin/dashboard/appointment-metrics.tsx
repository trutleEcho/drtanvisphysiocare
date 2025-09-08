"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

function getColor(variable: string) {
    if (typeof window !== "undefined") {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim()
    }
    return "" // fallback for SSR
}

const data = [
    { name: "Completed", value: 156, color: "var(--primary)" },
    { name: "Scheduled", value: 89, color: "var(--secondary)" },
    { name: "Cancelled", value: 23, color: "var(--destructive)" },
    { name: "No Show", value: 12, color: "var(--muted-foreground)" },
]

export function AppointmentMetrics() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
                <CardDescription>Distribution of appointment statuses this month</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor(entry.color)}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: getColor("--card"),
                                border: `1px solid ${getColor("--border")}`,
                                borderRadius: "8px",
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
