"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const revenueData = [
  { month: "Jan", revenue: 42000, appointments: 180 },
  { month: "Feb", revenue: 38500, appointments: 165 },
  { month: "Mar", revenue: 45200, appointments: 195 },
  { month: "Apr", revenue: 41800, appointments: 172 },
  { month: "May", revenue: 47300, appointments: 203 },
  { month: "Jun", revenue: 45231, appointments: 189 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Appointments</CardTitle>
        <CardDescription>Monthly revenue trends and appointment volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value, name) => [
                name === "revenue" ? `$${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Appointments",
              ]}
            />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
