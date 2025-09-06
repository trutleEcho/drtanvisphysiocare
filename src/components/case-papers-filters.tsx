"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar, FileType, User, Tag } from "lucide-react"

export function CasePapersFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("all")
  const [selectedFileType, setSelectedFileType] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedPatient("all")
    setSelectedFileType("all")
    setSelectedDateRange("all")
    setSelectedTags([])
  }

  const activeFiltersCount = [
    searchTerm,
    selectedPatient !== "all",
    selectedFileType !== "all",
    selectedDateRange !== "all",
    selectedTags.length > 0,
  ].filter(Boolean).length

  const availableTags = ["Lab Results", "X-Ray", "MRI", "Prescription", "Insurance", "Referral", "Discharge Summary"]

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
            <SelectItem value="1">John Doe</SelectItem>
            <SelectItem value="2">Sarah Johnson</SelectItem>
          </SelectContent>
        </Select>

        {/* File Type Filter */}
        <Select value={selectedFileType} onValueChange={setSelectedFileType}>
          <SelectTrigger className="w-full sm:w-48">
            <FileType className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="doc">Documents</SelectItem>
            <SelectItem value="dicom">DICOM</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
        <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
          <SelectTrigger className="w-full sm:w-48">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Dates" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
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
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Tag className="h-4 w-4" />
          Filter by tags:
        </div>
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20"
            onClick={() => {
              setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
