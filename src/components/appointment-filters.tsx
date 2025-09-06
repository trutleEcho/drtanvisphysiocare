"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Clock, User } from "lucide-react"

export function AppointmentFilters() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDoctor, setSelectedDoctor] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const clearFilters = () => {
    setSelectedDate("")
    setSelectedStatus("all")
    setSelectedDoctor("all")
    setSelectedType("all")
  }

  const activeFiltersCount = [
    selectedDate,
    selectedStatus !== "all",
    selectedDoctor !== "all",
    selectedType !== "all",
  ].filter(Boolean).length

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      <div className="flex flex-wrap gap-4 flex-1">
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-input rounded-md text-sm bg-background"
          />
        </div>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Doctor Filter */}
        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
          <SelectTrigger className="w-40">
            <User className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            <SelectItem value="dr1">Dr. Smith</SelectItem>
            <SelectItem value="dr2">Dr. Johnson</SelectItem>
            <SelectItem value="dr3">Dr. Williams</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40">
            <Clock className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="procedure">Procedure</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {activeFiltersCount} active
          </Badge>
        )}
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
