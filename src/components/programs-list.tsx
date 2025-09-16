"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Target, MoreHorizontal, Edit, Copy, Trash2, Play, Pause } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { programApi } from "@/lib/api"
import { toast } from "sonner"
import { format } from "date-fns"

interface ProgramsListProps {
  viewMode: "grid" | "list"
  programs: any[]
  onRefresh?: () => void
}

export function ProgramsList({ viewMode, programs, onRefresh }: ProgramsListProps) {

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

  const handleDelete = async (programId: string) => {
    try {
      await programApi.deleteProgram(programId)
      toast.success("Program deleted successfully")
      onRefresh?.()
    } catch (error) {
      toast.error("Failed to delete program")
    }
  }

  const handleStatusUpdate = async (programId: string, newStatus: string) => {
    try {
      await programApi.updateProgram(programId, { status: newStatus })
      toast.success(`Program ${newStatus.toLowerCase()} successfully`)
      onRefresh?.()
    } catch (error) {
      toast.error("Failed to update program status")
    }
  }

  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Programs Found</h3>
        <p className="text-muted-foreground">Create your first program to get started.</p>
      </div>
    )
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
                <p className="text-sm text-muted-foreground line-clamp-2">{program.description || "No description"}</p>
              </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/a/n/programs/${program.id}`} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Program
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleStatusUpdate(program.id, program.status === "active" ? "draft" : "active")}
                    >
                      {program.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {program.status === "active" ? "Pause" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => handleDelete(program.id)}
                    >
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
                  <p className="text-sm font-medium">
                    {program.startDate && program.endDate 
                      ? `${Math.ceil((new Date(program.endDate).getTime() - new Date(program.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks`
                      : "Ongoing"
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{program.exercises?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Exercises</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{program.patient?.name ? "1" : "0"}</p>
                  <p className="text-xs text-muted-foreground">Patient</p>
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
                <Badge className={getStatusColor(program.status || "draft")}>{program.status || "draft"}</Badge>
                {program.patient && (
                  <Badge variant="outline">{program.patient.name}</Badge>
                )}
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
                  <p className="text-muted-foreground">{program.description || "No description"}</p>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {program.startDate && program.endDate 
                      ? `${Math.ceil((new Date(program.endDate).getTime() - new Date(program.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks duration`
                      : "Ongoing"
                    }
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {program.exercises?.length || 0} exercises
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {program.patient?.name ? "1 assigned patient" : "No assigned patients"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(program.status || "draft")}>{program.status || "draft"}</Badge>
                  {program.patient && (
                    <Badge variant="outline">{program.patient.name}</Badge>
                  )}
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
                  <Link href={`/a/n/programs/${program.id}`}>View Details</Link>
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
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleStatusUpdate(program.id, program.status === "active" ? "draft" : "active")}
                    >
                      {program.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {program.status === "active" ? "Pause" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => handleDelete(program.id)}
                    >
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
