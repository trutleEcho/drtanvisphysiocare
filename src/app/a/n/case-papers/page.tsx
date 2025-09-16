"use client"

import { Suspense, useEffect, useState } from "react"
import { CasePapersList } from "@/components/case-papers-list"
import { CasePapersFilters } from "@/components/case-papers-filters"
import { UploadDocumentDialog } from "@/components/upload-document-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Grid, List } from "lucide-react"
import { casePaperApi, patientApi } from "@/lib/api"
import { useAppSelector } from "@/lib/store"
import { toast } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"
import PageHeader from "@/components/composable/page-header"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"

export default function CasePapersPage() {
  const doctor = useAppSelector((state) => state.doctor)
  
  const [casePapers, setCasePapers] = useState<any[]>([])
  const [filteredCasePapers, setFilteredCasePapers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchCasePapers() {
    try {
      setLoading(true)
      // First get all patients for this doctor
      const patients = await patientApi.getPatients(doctor.id)
      
      if (patients.length === 0) {
        setCasePapers([])
        setFilteredCasePapers([])
        toast.info("No patients found")
        return
      }

      // Then get case papers for all patients
      const allCasePapers = []
      for (const patient of patients) {
        try {
          const patientCasePapers = await casePaperApi.getCasePapers(patient.id)
          allCasePapers.push(...patientCasePapers)
        } catch (error) {
          console.error(`Failed to fetch case papers for patient ${patient.id}:`, error)
        }
      }
      
      if (allCasePapers.length > 0) {
        setCasePapers(allCasePapers)
        setFilteredCasePapers(allCasePapers)
        toast.success("Case papers loaded successfully")
      } else {
        setCasePapers([])
        setFilteredCasePapers([])
        toast.info("No case papers found")
      }
    } catch (error: any) {
      toast.error("Failed to load case papers: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (doctor?.id) {
      fetchCasePapers()
    }
  }, [doctor.id])

  return (
    <>
      <PageHeader props={{
        title: "Case Papers Management",
        description: "Manage medical documents, reports, and patient files",
        breadcrumb: {
          homeHref: "/a/n/dashboard",
          pages: ["Case Papers"],
          pagesHref: ["/a/n/case-papers"]
        },
        actions: (
          <ErrorBoundary>
            <UploadDocumentDialog onSuccess={fetchCasePapers}>
              <InteractiveHoverButton className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </InteractiveHoverButton>
            </UploadDocumentDialog>
          </ErrorBoundary>
        )
      }} />

      <div className="p-8 space-y-8">
        {/* Filters */}
        <ErrorBoundary>
          <CasePapersFilters 
            casePapers={casePapers}
            onFilteredCasePapersChange={setFilteredCasePapers}
            onRefresh={fetchCasePapers}
          />
        </ErrorBoundary>

        {/* Document Views */}
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
                <CasePapersList 
                  viewMode="grid" 
                  casePapers={filteredCasePapers}
                  onRefresh={fetchCasePapers}
                />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>

          <TabsContent value="list">
            <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
              <ErrorBoundary>
                <CasePapersList 
                  viewMode="list" 
                  casePapers={filteredCasePapers}
                  onRefresh={fetchCasePapers}
                />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
