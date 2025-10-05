"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock, Users, Target, RefreshCw } from "lucide-react"

interface ProgramsFiltersProps {
  programs: any[]
  onFilteredProgramsChange: (filteredPrograms: any[]) => void
  onRefresh: () => void
}

export function ProgramsFilters({ programs, onFilteredProgramsChange, onRefresh }: ProgramsFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filterPrograms = useCallback(() => {
    if (!programs) return []
    
    let filtered = [...programs]
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(program =>
        program.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(program => program.status === selectedStatus)
    }
    
    // Apply type filter
    if (selectedType !== "all") {
      if (selectedType === "generic") {
        filtered = filtered.filter(program => program.patientId === null)
      } else if (selectedType === "patient-specific") {
        filtered = filtered.filter(program => program.patientId !== null)
      }
    }
    
    return filtered
  }, [programs, searchTerm, selectedStatus, selectedType])

  useEffect(() => {
    const filtered = filterPrograms()
    onFilteredProgramsChange(filtered)
  }, [filterPrograms, onFilteredProgramsChange])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedStatus("all")
    setSelectedType("all")
  }

  const activeFiltersCount = [
    searchTerm,
    selectedStatus !== "all",
    selectedType !== "all",
  ].filter(Boolean).length

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search programs by name, description, or exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>


      {/* Type Filter */}
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-full sm:w-48">
          <Target className="h-4 w-4 mr-2" />
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="generic">Generic</SelectItem>
          <SelectItem value="patient-specific">Patient-Specific</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-full sm:w-48">
          <Users className="h-4 w-4 mr-2" />
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

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
        <Button variant="outline" onClick={onRefresh} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  )
}
