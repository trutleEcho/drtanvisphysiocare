"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  FileText,
  ImageIcon,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  User,
  FileType,
  Trash2,
  Edit,
  Share,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { casePaperApi } from "@/lib/api"
import { toast } from "sonner"
import { format } from "date-fns"
import { EditCasePaperDialog } from "@/components/edit-case-paper-dialog"

interface CasePapersListProps {
  viewMode: "grid" | "list"
  casePapers: any[]
  onRefresh?: () => void
}

export function CasePapersList({ viewMode, casePapers, onRefresh }: CasePapersListProps) {
  const [editingCasePaper, setEditingCasePaper] = useState<any>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon
    return FileText
  }

  const handleDelete = async (casePaperId: string) => {
    try {
      await casePaperApi.deleteCasePaper(casePaperId)
      toast.success("Case paper deleted successfully")
      onRefresh?.()
    } catch (error) {
      toast.error("Failed to delete case paper")
    }
  }

  const handleEdit = (casePaper: any) => {
    setEditingCasePaper(casePaper)
    setEditDialogOpen(true)
  }

  const handleEditSuccess = () => {
    setEditDialogOpen(false)
    setEditingCasePaper(null)
    onRefresh?.()
  }

  if (casePapers.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Case Papers Found</h3>
        <p className="text-muted-foreground">Upload your first document to get started.</p>
      </div>
    )
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {casePapers.map((casePaper) => {
          const FileIcon = FileText // Default to FileText for case papers

          return (
            <Card key={casePaper.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* File Icon and Actions */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <FileIcon className="h-6 w-6 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Share className="h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2"
                          onClick={() => handleEdit(casePaper)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-destructive"
                          onClick={() => handleDelete(casePaper.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Document Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{casePaper.diagnosis || "Case Paper"}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {casePaper.history ? 
                        (casePaper.history.length > 100 ? 
                          `${casePaper.history.substring(0, 100)}...` : 
                          casePaper.history
                        ) : 
                        "No history available"
                      }
                    </p>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {casePaper.patient?.name?.charAt(0) || "P"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {casePaper.patient?.name || "Unknown Patient"}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(casePaper.createdAt), "MMM dd, yyyy")}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {casePapers.map((casePaper) => {
        const FileIcon = FileText

        return (
          <Card key={casePaper.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <FileIcon className="h-6 w-6 text-primary" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{casePaper.diagnosis || "Case Paper"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {casePaper.history ? 
                          (casePaper.history.length > 200 ? 
                            `${casePaper.history.substring(0, 200)}...` : 
                            casePaper.history
                          ) : 
                          "No history available"
                        }
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {casePaper.patient?.name || "Unknown Patient"}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileType className="h-4 w-4" />
                        Case Paper
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(casePaper.createdAt), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Share className="h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2"
                        onClick={() => handleEdit(casePaper)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-destructive"
                        onClick={() => handleDelete(casePaper.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
      
      {/* Edit Dialog */}
      {editingCasePaper && (
        <EditCasePaperDialog
          casePaper={editingCasePaper}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  )
}
