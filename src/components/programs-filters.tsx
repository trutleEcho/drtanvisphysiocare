"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock, Users, Target } from "lucide-react"

export function ProgramsFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedDuration("all")
    setSelectedStatus("all")
  }

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== "all",
    selectedDuration !== "all",
    selectedStatus !== "all",
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

      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full sm:w-48">
          <Target className="h-4 w-4 mr-2" />
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
          <SelectItem value="fitness">Fitness</SelectItem>
          <SelectItem value="therapy">Therapy</SelectItem>
          <SelectItem value="recovery">Recovery</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>

      {/* Duration Filter */}
      <Select value={selectedDuration} onValueChange={setSelectedDuration}>
        <SelectTrigger className="w-full sm:w-48">
          <Clock className="h-4 w-4 mr-2" />
          <SelectValue placeholder="All Durations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Durations</SelectItem>
          <SelectItem value="short">1-4 weeks</SelectItem>
          <SelectItem value="medium">1-3 months</SelectItem>
          <SelectItem value="long">3+ months</SelectItem>
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
      </div>
    </div>
  )
}
