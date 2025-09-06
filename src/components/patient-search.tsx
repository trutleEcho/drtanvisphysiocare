"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, SortAsc } from "lucide-react"

export function PatientSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

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

      <Button variant="outline" className="w-full sm:w-auto bg-transparent">
        Clear Filters
      </Button>
    </div>
  )
}
