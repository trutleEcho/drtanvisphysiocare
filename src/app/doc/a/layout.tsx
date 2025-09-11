import {createClient} from "@/lib/server";
import {redirect} from "next/navigation";
import {TopAndSidebar} from "@/components/layout/admin/top-and-sidebar";
import React, {Suspense} from "react";
import DeviceNotSupported from "@/components/composable/device-not-supported";

export default async function RootDoctorProtectedLayout({children}: {children: React.ReactNode}){
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()
    if (error || !data?.claims) {
        redirect('/doc/u/login')
    }

    const { data: user } = await supabase.auth.getUser()
    console.info(user)

    return (
        <>
            <div className="h-screen bg-card hidden md:flex relative">
                <TopAndSidebar />
                <main className="flex-1 overflow-auto bg-background rounded-t-3xl mt-18">
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </main>
            </div>
            <DeviceNotSupported/>
        </>
    )
}