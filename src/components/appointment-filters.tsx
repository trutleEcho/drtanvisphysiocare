"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Clock, User, Search, RefreshCcw, Check, Trash } from "lucide-react"
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { appointment } from "@/generated/prisma"
import {AppointmentWithRelations} from "@/lib/api";

export interface AppointmentFiltersProps {
  onFiltersChange?: (filters: {
    searchTerm: string
    selectedDate: string
    selectedStatus: string
  }) => void
  onRefresh?: () => void
  appointments?: AppointmentWithRelations[]
  onFilteredAppointmentsChange?: (appointments: AppointmentWithRelations[]) => void
}

export function AppointmentFilters({ 
  onFiltersChange, 
  onRefresh, 
  appointments = [], 
  onFilteredAppointmentsChange 
}: AppointmentFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onFiltersChange) {
        onFiltersChange({
          searchTerm,
          selectedDate,
          selectedStatus,
        })
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedDate, selectedStatus, onFiltersChange])

  // Filter and sort appointments
  const filterAppointments = useCallback(() => {
    let filtered = [...appointments]

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(appointment => 
        appointment.patient?.name?.toLowerCase().includes(term) ||
        appointment.status.toLowerCase().includes(term)
      )
    }

    // Apply date filter
    if (selectedDate) {
      const filterDate = new Date(selectedDate)
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.dateTime)
        return appointmentDate.toDateString() === filterDate.toDateString()
      })
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(appointment => 
        appointment.status.toLowerCase() === selectedStatus.toLowerCase()
      )
    }

    return filtered
  }, [appointments, searchTerm, selectedDate, selectedStatus])

  // Update filtered appointments when dependencies change
  useEffect(() => {
    const filtered = filterAppointments()
    if (onFilteredAppointmentsChange) {
      onFilteredAppointmentsChange(filtered)
    }
  }, [filterAppointments, onFilteredAppointmentsChange])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedDate("")
    setSelectedStatus("all")
  }

  const activeFiltersCount = [
    searchTerm,
    selectedDate,
    selectedStatus !== "all",
  ].filter(Boolean).length

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search appointments by patient, doctor, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-4">
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

      </div>

      <div className="flex items-center gap-2">
        {onRefresh && (
          <InteractiveHoverButton icon={<RefreshCcw className="animate-spin"/>} onClick={onRefresh}>
              Refresh
          </InteractiveHoverButton>
        )}
        
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {activeFiltersCount} active
          </Badge>
        )}
        
        <AnimatedSubscribeButton onClick={clearFilters}>
          <span className="flex items-center gap-2">
            <Trash className="h-4 w-4" />
            Clear Filters
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Cleared
          </span>
        </AnimatedSubscribeButton>
      </div>
    </div>
  )
}
