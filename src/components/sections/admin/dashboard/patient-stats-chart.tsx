"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", newPatients: 45, totalPatients: 1120 },
  { month: "Feb", newPatients: 52, totalPatients: 1172 },
  { month: "Mar", newPatients: 38, totalPatients: 1210 },
  { month: "Apr", newPatients: 61, totalPatients: 1271 },
  { month: "May", newPatients: 42, totalPatients: 1313 },
  { month: "Jun", newPatients: 55, totalPatients: 1368 },
]

export function PatientStatsChart() {
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
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="totalPatients"
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
