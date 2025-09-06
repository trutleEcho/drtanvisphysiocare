"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockPrograms } from "@/lib/db"
import { Clock, Users, Target, MoreHorizontal, Edit, Copy, Trash2, Play, Pause } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProgramsListProps {
  viewMode: "grid" | "list"
}

export function ProgramsList({ viewMode }: ProgramsListProps) {
  const [programs] = useState(mockPrograms)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "rehabilitation":
        return "bg-blue-100 text-blue-800"
      case "fitness":
        return "bg-green-100 text-green-800"
      case "therapy":
        return "bg-purple-100 text-purple-800"
      case "recovery":
        return "bg-orange-100 text-orange-800"
      case "maintenance":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-2">{program.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{program.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/src/app/(admin)/programs/${program.id}`} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Program
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      {program.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {program.status === "active" ? "Pause" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Program Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{program.duration} weeks</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{program.exercises.length}</p>
                  <p className="text-xs text-muted-foreground">Exercises</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{program.assignedPatients.length}</p>
                  <p className="text-xs text-muted-foreground">Patients</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className={getCategoryColor(program.category)}>{program.category}</Badge>
                <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {programs.map((program) => (
        <Card key={program.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{program.name}</h3>
                  <p className="text-muted-foreground">{program.description}</p>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {program.duration} weeks duration
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {program.exercises.length} exercises
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {program.assignedPatients.length} assigned patients
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getCategoryColor(program.category)}>{program.category}</Badge>
                  <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                </div>

                {/* Progress */}
                <div className="max-w-md">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Completion</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/src/app/(admin)/programs/${program.id}`}>View Details</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Program
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      {program.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {program.status === "active" ? "Pause" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
