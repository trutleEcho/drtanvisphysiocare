"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Search, Filter, SortAsc, Check, Trash, RefreshCcw} from "lucide-react"
import {AnimatedSubscribeButton} from "@/components/magicui/animated-subscribe-button";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {appointment, casePaper, program, progressNote} from "@/generated/prisma";

export interface PatientProfileSearchProps {
    onSearchChange?: (searchTerm: string) => void
    onSortChange?: (sortBy: string) => void
    onFilterChange?: (filterBy: string) => void
    onRefresh?: () => void
    appointments?: appointment[]
    casePapers?: casePaper[]
    programs?: program[]
    progressNotes?: progressNote[]
    onFilteredDataChange?: (data: {
        appointments: appointment[]
        casePapers: casePaper[]
        programs: program[]
        progressNotes: progressNote[]
    }) => void
}

export function PatientProfileSearch({props}: {props: PatientProfileSearchProps}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date-new")
  const [filterBy, setFilterBy] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (props.onSearchChange) {
        props.onSearchChange(searchTerm)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, props.onSearchChange])

  // Simple search functionality without complex filtering to avoid infinite loops
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    // For now, just pass the original data to avoid infinite loops
    // The filtering can be implemented later if needed
    if (props.onFilteredDataChange) {
      props.onFilteredDataChange({
        appointments: props.appointments || [],
        casePapers: props.casePapers || [],
        programs: props.programs || [],
        progressNotes: props.progressNotes || []
      })
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSortBy("date-new")
    setFilterBy("all")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search records, diagnoses, notes..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Sort Dropdown */}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-48">
          <SortAsc className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-new">Newest First</SelectItem>
          <SelectItem value="date-old">Oldest First</SelectItem>
          <SelectItem value="name">Name/Title</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter Dropdown */}
      <Select value={filterBy} onValueChange={setFilterBy}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Records</SelectItem>
          <SelectItem value="recent">Recent (30 days)</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="chronic">Chronic</SelectItem>
          <SelectItem value="inactive">Older Records</SelectItem>
        </SelectContent>
      </Select>

      {props.onRefresh && (
        <InteractiveHoverButton icon={<RefreshCcw className="animate-spin"/>} onClick={props.onRefresh}>
            Refresh
        </InteractiveHoverButton>
      )}
      
      <AnimatedSubscribeButton onClick={clearFilters}>
          <span className="w-full sm:w-auto flex items-center gap-2">
              <Trash/>
              Clear Filters
          </span>
          <span className="w-full sm:w-auto flex items-center gap-2">
              <Check/>
              Cleared
          </span>
      </AnimatedSubscribeButton>
    </div>
  )
}
