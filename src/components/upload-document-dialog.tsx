"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { mockPatients } from "@/lib/db"
import { Upload, X, FileText, ImageIcon, File } from "lucide-react"

interface UploadDocumentDialogProps {
  children: React.ReactNode
}

export function UploadDocumentDialog({ children }: UploadDocumentDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    patientId: "",
    tags: [] as string[],
    newTag: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    // Handle form submission here
    console.log("Document data:", { ...formData, file: selectedFile })
    setOpen(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      patientId: "",
      tags: [],
      newTag: "",
    })
    setSelectedFile(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return ImageIcon
    if (file.type === "application/pdf") return FileText
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>Upload a new medical document or case paper.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Document File</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    {(() => {
                      const FileIcon = getFileIcon(selectedFile)
                      return <FileIcon className="h-12 w-12 text-primary" />
                    })()}
                  </div>
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => setSelectedFile(null)}>
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-sm font-medium">Drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports PDF, images, and documents up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.dicom"
                    className="hidden"
                    id="file-upload"
                  />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Browse Files
                    </label>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Document Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter document title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                placeholder="Enter document description..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName} - {patient.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.newTag}
                  onChange={(e) => handleInputChange("newTag", e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedFile}>
              Upload Document
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
