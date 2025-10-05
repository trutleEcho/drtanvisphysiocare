import TopAndSidebar from "@/components/layout/admin/top-and-sidebar";
import React, {Suspense} from "react";
import DeviceNotSupported from "@/components/composable/device-not-supported";
import {LoaderOne} from "@/components/ui/loader";

export default function DoctorLayout({children}: {children: React.ReactNode}){
    return (
        <>
            <div className="h-screen bg-card hidden md:flex relative">
                <TopAndSidebar />
                <main className="flex-1 overflow-auto bg-background rounded-t-3xl mt-18">
                    <Suspense fallback={<div className="flex items-center justify-center h-full"><LoaderOne/></div>}>
                        {children}
                    </Suspense>
                </main>
            </div>
            <DeviceNotSupported />
        </>
    )
}