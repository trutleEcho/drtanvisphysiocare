"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockCasePapers, mockPatients } from "@/lib/db"
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

interface CasePapersListProps {
  viewMode: "grid" | "list"
}

export function CasePapersList({ viewMode }: CasePapersListProps) {
  const [documents] = useState(mockCasePapers)

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map((document) => {
          const patient = mockPatients.find((p) => p.id === document.patientId)
          const FileIcon = getFileIcon(document.fileType)

          return (
            <Card key={document.id} className="hover:shadow-md transition-shadow group">
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
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Document Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{document.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{document.description}</p>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {patient?.firstName[0]}
                        {patient?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {patient?.firstName} {patient?.lastName}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {document.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {document.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        +{document.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(document.createdAt).toLocaleDateString()}
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
      {documents.map((document) => {
        const patient = mockPatients.find((p) => p.id === document.patientId)
        const FileIcon = getFileIcon(document.fileType)

        return (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <FileIcon className="h-6 w-6 text-primary" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{document.title}</h3>
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {patient?.firstName} {patient?.lastName}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileType className="h-4 w-4" />
                        {document.fileType}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(document.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-destructive">
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
    </div>
  )
}
