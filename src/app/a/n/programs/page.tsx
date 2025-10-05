"use client"

import { Suspense, useEffect, useState } from "react"
import { ProgramsList } from "@/components/programs-list"
import { ProgramsFilters } from "@/components/programs-filters"
import { CreateProgramDialog } from "@/components/create-program-dialog"
import { TemplateLibraryDialog } from "@/components/template-library-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Grid, List, BookOpen, Library } from "lucide-react"
import { programApi, exerciseApi } from "@/lib/api"
import { useAppSelector } from "@/lib/store"
import { toast } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"
import PageHeader from "@/components/composable/page-header"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"

export default function ProgramsPage() {
  const doctor = useAppSelector((state) => state.doctor)
  
  const [programs, setPrograms] = useState<any[]>([])
  const [genericPrograms, setGenericPrograms] = useState<any[]>([])
  const [patientSpecificPrograms, setPatientSpecificPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchPrograms() {
    try {
      setLoading(true)
      // Using a default organization ID - in a real app, this would come from the doctor's organization
      const organizationId = "org1" // This should be dynamic based on the doctor's organization
      
      const programsData = await programApi.getPrograms(organizationId, {})
      
      if (programsData.length > 0) {
        setPrograms(programsData)
        
        // Separate generic and patient-specific programs
        const generic = programsData.filter(p => p.patientId === null)
        const patientSpecific = programsData.filter(p => p.patientId !== null)
        
        setGenericPrograms(generic)
        setPatientSpecificPrograms(patientSpecific)
        toast.success("Programs loaded successfully")
      } else {
        setPrograms([])
        setGenericPrograms([])
        setPatientSpecificPrograms([])
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
            <TemplateLibraryDialog organizationId="org1">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Library className="h-4 w-4" />
                Template Library
              </Button>
            </TemplateLibraryDialog>
            <ErrorBoundary>
              <CreateProgramDialog onSuccess={fetchPrograms}>
                <InteractiveHoverButton className="flex items-center gap-2">
                  Create Program
                </InteractiveHoverButton>
              </CreateProgramDialog>
            </ErrorBoundary>
          </div>
        )
      }} />

      <div className="p-8 space-y-8">
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

          <TabsContent value="grid" className="space-y-8">
            {/* Generic Programs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Generic Programs</h2>
                  <p className="text-muted-foreground">Reusable programs available for assignment to any patient</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {genericPrograms.length} programs
                </Badge>
              </div>
              
              <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
                <ErrorBoundary>
                  <ProgramsList 
                    viewMode="grid" 
                    programs={genericPrograms}
                    onRefresh={fetchPrograms}
                  />
                </ErrorBoundary>
              </Suspense>
            </div>

            {/* Patient-Specific Programs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Patient-Specific Programs</h2>
                  <p className="text-muted-foreground">Programs currently assigned to specific patients</p>
                </div>
                <Badge variant="outline" className="text-purple-600 border-purple-200">
                  {patientSpecificPrograms.length} programs
                </Badge>
              </div>
              
              <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
                <ErrorBoundary>
                  <ProgramsList 
                    viewMode="grid" 
                    programs={patientSpecificPrograms}
                    onRefresh={fetchPrograms}
                  />
                </ErrorBoundary>
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-8">
            {/* Generic Programs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Generic Programs</h2>
                  <p className="text-muted-foreground">Reusable programs available for assignment to any patient</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {genericPrograms.length} programs
                </Badge>
              </div>
              
              <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
                <ErrorBoundary>
                  <ProgramsList 
                    viewMode="list" 
                    programs={genericPrograms}
                    onRefresh={fetchPrograms}
                  />
                </ErrorBoundary>
              </Suspense>
            </div>

            {/* Patient-Specific Programs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Patient-Specific Programs</h2>
                  <p className="text-muted-foreground">Programs currently assigned to specific patients</p>
                </div>
                <Badge variant="outline" className="text-purple-600 border-purple-200">
                  {patientSpecificPrograms.length} programs
                </Badge>
              </div>
              
              <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
                <ErrorBoundary>
                  <ProgramsList 
                    viewMode="list" 
                    programs={patientSpecificPrograms}
                    onRefresh={fetchPrograms}
                  />
                </ErrorBoundary>
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
