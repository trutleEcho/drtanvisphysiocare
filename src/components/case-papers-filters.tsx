"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar, FileType, User, Tag, RefreshCw } from "lucide-react"

interface CasePapersFiltersProps {
  casePapers: any[]
  onFilteredCasePapersChange: (filteredCasePapers: any[]) => void
  onRefresh: () => void
}

export function CasePapersFilters({ casePapers, onFilteredCasePapersChange, onRefresh }: CasePapersFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("all")

  const filterCasePapers = useCallback(() => {
    if (!casePapers) return []
    
    let filtered = [...casePapers]
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(casePaper =>
        casePaper.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        casePaper.history?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        casePaper.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply patient filter
    if (selectedPatient !== "all") {
      filtered = filtered.filter(casePaper => casePaper.patientId === selectedPatient)
    }
    
    return filtered
  }, [casePapers, searchTerm, selectedPatient])

  useEffect(() => {
    const filtered = filterCasePapers()
    onFilteredCasePapersChange(filtered)
  }, [filterCasePapers, onFilteredCasePapersChange])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedPatient("all")
  }

  const activeFiltersCount = [
    searchTerm,
    selectedPatient !== "all",
  ].filter(Boolean).length

  // Get unique patients from case papers
  const uniquePatients = Array.from(
    new Set(casePapers.map(cp => cp.patient).filter(Boolean))
  ).map(patient => ({ id: patient.id, name: patient.name }))

  return (
    <div className="space-y-4">
      {/* Search and Main Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents by title, description, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Patient Filter */}
        <Select value={selectedPatient} onValueChange={setSelectedPatient}>
          <SelectTrigger className="w-full sm:w-48">
            <User className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Patients" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patients</SelectItem>
            {uniquePatients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name}
              </SelectItem>
            ))}
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
    </div>
  )
}
