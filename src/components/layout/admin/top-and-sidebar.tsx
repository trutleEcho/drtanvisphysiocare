"use client";

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
import {Separator} from "@/components/ui/separator";
import {AnimatedThemeToggler} from "@/components/magicui/animated-theme-toggler";
import Image from "next/image";
import {createClient} from "@/lib/client";
import {router} from "next/client";
import {Button} from "@/components/ui/button";

const links = [
    {label: "Dashboard", href: "/doc/a/dashboard", icon: <LayoutDashboard className="w-5 h-5"/>},
    {label: "Patients", href: "/doc/a/patients", icon: <Users className="w-5 h-5"/>},
    {label: "Appointments", href: "/doc/a/appointments", icon: <Calendar className="w-5 h-5"/>},
    {label: "Case Papers", href: "/doc/a/case-papers", icon: <FileText className="w-5 h-5"/>},
    {label: "Programs", href: "/doc/a/programs", icon: <GraduationCap className="w-5 h-5"/>},
];

export function TopAndSidebar() {

    const logout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        await router.push('/doc')
    }

    return (
        <>
            <Sidebar>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {/*<Logo/>*/}
                        <div className="mt-24 flex flex-col gap-2">
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
                                    <Image
                                        src="/Tanvis_Favicon.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                        <Separator className="my-2"/>
                        {/*<SidebarLink*/}
                        {/*    link={{*/}
                        {/*        label: "Logout",*/}
                        {/*        href: "/logout",*/}
                        {/*        icon: <LogOut className="w-5 h-5 text-red-500"/>,*/}
                        {/*    }}*/}
                        {/*    className="justify-center"*/}
                        {/*></SidebarLink>*/}
                        <Button onClick={logout} className="text-red-500 flex flex-row items-center justify-center gap-5 " variant="ghost"><LogOut className="w-5 h-5 text-red-500"/><span>Logout</span></Button>
                    </div>
                </SidebarBody>
            </Sidebar>
            <section className="absolute top-0 right-0 w-full bg-transparent flex justify-between p-4">
                <Image
                    src="/Tanvis_Lable.png"
                    alt="Tanvis PhysioCare"
                    width={128}
                    height={128}
                    className="ml-2"
                />
                <AnimatedThemeToggler className="p-2 rounded-full hover:bg-accent  bg-background"/>
            </section>
        </>
    );
}