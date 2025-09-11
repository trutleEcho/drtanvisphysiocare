import { Suspense } from "react"
import { ProgramsList } from "@/components/programs-list"
import { ProgramsFilters } from "@/components/programs-filters"
import { CreateProgramDialog } from "@/components/create-program-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Grid, List, BookOpen } from "lucide-react"

export default function ProgramsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Programs Management</h1>
          <p className="text-muted-foreground">Create and manage treatment programs and training plans</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <BookOpen className="h-4 w-4" />
            Template Library
          </Button>
          <CreateProgramDialog>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Program
            </Button>
          </CreateProgramDialog>
        </div>
      </div>

      {/* Filters */}
      <ProgramsFilters />

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
            <ProgramsList viewMode="grid" />
          </Suspense>
        </TabsContent>

        <TabsContent value="list">
          <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse" />}>
            <ProgramsList viewMode="list" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
