import { Suspense } from "react"
import { CasePapersList } from "@/components/case-papers-list"
import { CasePapersFilters } from "@/components/case-papers-filters"
import { UploadDocumentDialog } from "@/components/upload-document-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Grid, List } from "lucide-react"

export default function CasePapersPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Case Papers Management</h1>
          <p className="text-muted-foreground">Manage medical documents, reports, and patient files</p>
        </div>
        <UploadDocumentDialog>
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </UploadDocumentDialog>
      </div>

      {/* Filters */}
      <CasePapersFilters />

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
            <CasePapersList viewMode="grid" />
          </Suspense>
        </TabsContent>

        <TabsContent value="list">
          <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
            <CasePapersList viewMode="list" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
