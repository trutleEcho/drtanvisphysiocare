"use client"

import React, {useEffect} from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Separator} from "@/components/ui/separator";
import {createPatient} from "@/data/services/patientServices";
import {toast} from "sonner";
import {AnimatedSubscribeButton} from "@/components/magicui/animated-subscribe-button";
import {useAppSelector} from "@/lib/store";

interface AddPatientDialogProps {
    children: React.ReactNode,
    refetch: () => void
}

export function AddPatientDialog({props}: { props: AddPatientDialogProps }) {
    const doctor = useAppSelector((state) => state.doctor)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "", // full name
        age: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const addedPatient = await createPatient({
                organizationId: doctor.organizationId,
                doctorId: doctor.id,
                name: formData.name,
                age: Number(formData.age) || null,
                gender: formData.gender,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
            })

            if (!addedPatient) {
                toast.error("Failed to create patient")
            } else {
                toast.success("Patient created successfully")
            }
            setOpen(false)

            // Reset form
            setFormData({
                name: "",
                age: "",
                gender: "",
                email: "",
                phone: "",
                address: "",
            })
        } catch (error: any) {
            toast.error("Failed to create patient:", error)
        } finally {
            props.refetch()
            setLoading(false)
        }
    }

    useEffect(() => {
        setFormData({
            name: "",
            age: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
        })
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription>Enter the patient’s information to create a new profile.</DialogDescription>
                </DialogHeader>

                <Separator/>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="mandatory">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange("age", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) => handleInputChange("gender", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select gender"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <AnimatedSubscribeButton subscribeStatus={loading}>
                            <span>Add Patient</span>
                            <span>Adding...</span>
                        </AnimatedSubscribeButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
