import { redirect } from "next/navigation"
import React from "react"
import {createClient} from "@/lib/server";

export default async function RootProtectedLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()
    if (error || !data?.claims) {
        redirect("/auth/login")
    }

    return children
}
