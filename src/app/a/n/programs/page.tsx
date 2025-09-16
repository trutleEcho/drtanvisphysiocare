"use client"

import { Suspense, useEffect, useState } from "react"
import { ProgramsList } from "@/components/programs-list"
import { ProgramsFilters } from "@/components/programs-filters"
import { CreateProgramDialog } from "@/components/create-program-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Grid, List, BookOpen } from "lucide-react"
import { programApi } from "@/lib/api"
import { useAppSelector } from "@/lib/store"
import { toast } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"
import PageHeader from "@/components/composable/page-header"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"

export default function ProgramsPage() {
  const doctor = useAppSelector((state) => state.doctor)
  
  const [programs, setPrograms] = useState<any[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchPrograms() {
    try {
      setLoading(true)
      // Using a default organization ID - in a real app, this would come from the doctor's organization
      const organizationId = "org1" // This should be dynamic based on the doctor's organization
      const programsData = await programApi.getPrograms(organizationId)
      
      if (programsData.length > 0) {
        setPrograms(programsData)
        setFilteredPrograms(programsData)
        toast.success("Programs loaded successfully")
      } else {
        setPrograms([])
        setFilteredPrograms([])
        toast.info("No programs found")
      }
    } catch (error: any) {
      toast.error("Failed to load programs: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (doctor?.id) {
      fetchPrograms()
    }
  }, [doctor.id])

  return (
    <>
      <PageHeader props={{
        title: "Programs Management",
        description: "Create and manage treatment programs and training plans",
        breadcrumb: {
          homeHref: "/a/n/dashboard",
          pages: ["Programs"],
          pagesHref: ["/a/n/programs"]
        },
        actions: (
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <BookOpen className="h-4 w-4" />
              Template Library
            </Button>
            <ErrorBoundary>
              <CreateProgramDialog onSuccess={fetchPrograms}>
                <InteractiveHoverButton className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Program
                </InteractiveHoverButton>
              </CreateProgramDialog>
            </ErrorBoundary>
          </div>
        )
      }} />

      <div className="p-8 space-y-8">
        {/* Filters */}
        <ErrorBoundary>
          <ProgramsFilters 
            programs={programs}
            onFilteredProgramsChange={setFilteredPrograms}
            onRefresh={fetchPrograms}
          />
        </ErrorBoundary>

        {/* Programs Views */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
              <ErrorBoundary>
                <ProgramsList 
                  viewMode="grid" 
                  programs={filteredPrograms}
                  onRefresh={fetchPrograms}
                />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>

          <TabsContent value="list">
            <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
              <ErrorBoundary>
                <ProgramsList 
                  viewMode="list" 
                  programs={filteredPrograms}
                  onRefresh={fetchPrograms}
                />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
