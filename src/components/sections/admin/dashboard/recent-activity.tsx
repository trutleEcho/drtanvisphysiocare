import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar, FileText } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "appointment",
    message: "New appointment scheduled",
    patient: "John Doe",
    time: "2 minutes ago",
    icon: Calendar,
    status: "scheduled",
  },
  {
    id: 2,
    type: "patient",
    message: "Patient profile updated",
    patient: "Sarah Johnson",
    time: "15 minutes ago",
    icon: User,
    status: "updated",
  },
  {
    id: 3,
    type: "document",
    message: "Case paper uploaded",
    patient: "Mike Wilson",
    time: "1 hour ago",
    icon: FileText,
    status: "uploaded",
  },
  {
    id: 4,
    type: "appointment",
    message: "Appointment completed",
    patient: "Emily Davis",
    time: "2 hours ago",
    icon: Calendar,
    status: "completed",
  },
  {
    id: 5,
    type: "patient",
    message: "New patient registered",
    patient: "Robert Brown",
    time: "3 hours ago",
    icon: User,
    status: "new",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and actions in your practice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <activity.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{activity.patient}</p>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
