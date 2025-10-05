"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Search, Filter, SortAsc, Check, Trash, RefreshCcw} from "lucide-react"
import {AnimatedSubscribeButton} from "@/components/magicui/animated-subscribe-button";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {patient} from "@/generated/prisma";

export interface PatientSearchProps {
    refreshPatients: () => void
    onSearchChange?: (searchTerm: string) => void
    onSortChange?: (sortBy: string) => void
    onFilterChange?: (filterBy: string) => void
    patients?: patient[]
    filteredPatients?: patient[]
    onFilteredPatientsChange?: (patients: patient[]) => void
}

export function PatientSearch({props}: {props: PatientSearchProps}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (props.onSearchChange) {
        props.onSearchChange(searchTerm)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, props.onSearchChange])

  // Sort and filter effect
  useEffect(() => {
    if (props.onSortChange) {
      props.onSortChange(sortBy)
    }
  }, [sortBy, props.onSortChange])

  useEffect(() => {
    if (props.onFilterChange) {
      props.onFilterChange(filterBy)
    }
  }, [filterBy, props.onFilterChange])

  // Filter and sort patients
  const filterAndSortPatients = useCallback(() => {
    if (!props.patients) return []

    let filtered = [...props.patients]

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(term) ||
        patient.email?.toLowerCase().includes(term) ||
        patient.phone?.toLowerCase().includes(term) ||
        patient.address?.toLowerCase().includes(term)
      )
    }

    // Apply category filter
    if (filterBy !== "all") {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      
      switch (filterBy) {
        case "recent":
          filtered = filtered.filter(patient => 
            new Date(patient.createdAt) > thirtyDaysAgo
          )
          break
        case "active":
          // Patients with recent activity (created in last 30 days)
          filtered = filtered.filter(patient => 
            new Date(patient.createdAt) > thirtyDaysAgo
          )
          break
        case "chronic":
          // Patients with longer history (created more than 6 months ago)
          const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(patient => 
            new Date(patient.createdAt) <= sixMonthsAgo
          )
          break
        case "inactive":
          // Patients without recent activity
          filtered = filtered.filter(patient => 
            new Date(patient.createdAt) <= thirtyDaysAgo
          )
          break
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "date-new":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "date-old":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "age":
          return (b.age || 0) - (a.age || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [props.patients, searchTerm, sortBy, filterBy])

  // Update filtered patients when dependencies change
  useEffect(() => {
    const filtered = filterAndSortPatients()
    if (props.onFilteredPatientsChange) {
      props.onFilteredPatientsChange(filtered)
    }
  }, [filterAndSortPatients, props.onFilteredPatientsChange])

  const clearFilters = () => {
    setSearchTerm("")
    setSortBy("name")
    setFilterBy("all")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <SelectItem value="name">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          <SelectItem value="date-new">Newest First</SelectItem>
          <SelectItem value="date-old">Oldest First</SelectItem>
          <SelectItem value="age">Age</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter Dropdown */}
      <Select value={filterBy} onValueChange={setFilterBy}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Patients</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="recent">Recent Visits</SelectItem>
          <SelectItem value="chronic">Chronic Conditions</SelectItem>
        </SelectContent>
      </Select>

      <InteractiveHoverButton icon={<RefreshCcw className="animate-spin"/>} onClick={props.refreshPatients}>
          Refresh
      </InteractiveHoverButton>
      
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
