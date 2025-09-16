"use client"

import { useEffect, useState } from "react"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { setDoctor } from "@/data/reducers/doctor-reducer"
import { getDoctorByEmail } from "@/data/services/doctorServices"

export default function DoctorPage() {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [currentLoadingState, setCurrentLoadingState] = useState(0)
    const [loading, setLoading] = useState(false)

    const loadingStates = [
        { text: "Fetching Organization Details" },
        { text: "Fetching Doctor Data" },
        { text: "Fetching Patient Data" },
        { text: "Fetching Appointment Data" },
    ]

    useEffect(() => {
        async function loadDoctorData() {
            try {
                const data = await getDoctorByEmail(user.email)

                if (!data) {
                    toast.error("Doctor not found")
                    // router.push("/auth/login")
                    return null
                }

                dispatch(setDoctor(data))
                toast.success("Doctor Data Fetched")
                return data
            } catch (err) {
                toast.error("Failed to fetch doctor")
                return null
            }
        }

        async function run() {
            setLoading(true)

            // Step 1: Organization
            setTimeout(() => {
                setCurrentLoadingState(1)
                toast.success("Organization Data Fetched")
            }, 2000)

            // Step 2: Doctor
            const doctor = await loadDoctorData()
            if (!doctor) return
            setCurrentLoadingState(2)

            // Step 3: Patient
            setTimeout(() => {
                setCurrentLoadingState(3)
                toast.success("Patient Data Fetched")
            }, 4000)

            // Step 4: Appointment
            setTimeout(() => {
                setCurrentLoadingState(4)
                toast.success("Appointment Data Fetched")

                // ✅ Only redirect AFTER everything is done
                setLoading(false)
                router.push("/a/n/dashboard")
            }, 6000)
        }

        run()
    }, [dispatch, router, user.email])

    return (
        <MultiStepLoader
            loadingStates={loadingStates}
            value={currentLoadingState}
            loading={loading}
        />
    )
}
