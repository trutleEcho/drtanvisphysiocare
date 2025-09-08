"use client";

import {usePathname} from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    GraduationCap, LogOut,
} from "lucide-react";
import {
    Sidebar,
    SidebarBody,
    SidebarLink
} from "@/components/ui/sidebar";
import {useState} from "react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {AnimatedThemeToggler} from "@/components/magicui/animated-theme-toggler";

const links = [
    {label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5"/>},
    {label: "Patients", href: "/patients", icon: <Users className="w-5 h-5"/>},
    {label: "Appointments", href: "/appointments", icon: <Calendar className="w-5 h-5"/>},
    {label: "Case Papers", href: "/case-papers", icon: <FileText className="w-5 h-5"/>},
    {label: "Programs", href: "/programs", icon: <GraduationCap className="w-5 h-5"/>},
];

export function TopAndSidebar() {
    return (
        <>
            <Sidebar>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {/*<Logo/>*/}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Employee Name",
                                href: "#",
                                icon: (
                                    <img
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                        <Separator className="my-2"/>
                        <SidebarLink
                            link={{
                                label: "Logout",
                                href: "/logout",
                                icon: <LogOut className="w-5 h-5 text-red-500"/>,
                            }}
                            className="justify-center"
                        ></SidebarLink>
                    </div>
                </SidebarBody>
            </Sidebar>
            <section className="absolute top-0 right-0 w-full bg-transparent flex justify-end px-5 py-2">
                <AnimatedThemeToggler className="p-2 rounded-full hover:bg-accent  bg-background"/>
            </section>
        </>
    );
}

export const Logo = () => {
    return (
        <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal border-b border-border/30"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm"/>
            <span
                className="font-medium whitespace-pre text-xl"
            >
                Dr. Tanvis PhysioCare
            </span>
        </Link>
    );
};