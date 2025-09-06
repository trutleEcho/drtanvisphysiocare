import React, {Suspense} from "react";
import {TopAndSidebar} from "@/components/layout/admin/top-and-sidebar";
import DeviceNotSupported from "@/components/composable/device-not-supported";

export default function AdminLayout({children}: {children: React.ReactNode}){
    return(
        <>
            <div className="h-screen bg-card hidden md:flex relative">
                <TopAndSidebar />
                <main className="flex-1 overflow-auto bg-background rounded-3xl m-2 mt-14">
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </main>
            </div>
            <DeviceNotSupported/>
        </>
    )
}