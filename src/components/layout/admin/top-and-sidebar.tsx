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
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/lib/store";
import {clearUser} from "@/data/reducers/user-reducer";
import {clearDoctor} from "@/data/reducers/doctor-reducer";

const links = [
    {label: "Dashboard", href: "/a/n/dashboard", icon: <LayoutDashboard className="w-5 h-5"/>},
    {label: "Patients", href: "/a/n/patients", icon: <Users className="w-5 h-5"/>},
    {label: "Appointments", href: "/a/n/appointments", icon: <Calendar className="w-5 h-5"/>},
    {label: "Case Papers", href: "/a/n/case-papers", icon: <FileText className="w-5 h-5"/>},
    {label: "Programs", href: "/a/n/programs", icon: <GraduationCap className="w-5 h-5"/>},
];

export default function TopAndSidebar() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const organization = useAppSelector((state) => state.organization)
    const doctor = useAppSelector((state) => state.doctor)

    const logout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()

        dispatch(clearUser())
        dispatch(clearDoctor())

        router.replace('/auth/login')
    }

    return (
        <>
            <Sidebar>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <div className="mt-18 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            className="flex flex-row items-center justify-around bg-secondary/20 rounded-full"
                            link={{
                                label: `${doctor.name}`,
                                href: "#",
                                icon: (
                                    <Image
                                        src={'/avatar.png'}
                                        className="h-5 w-5 shrink-0 rounded-full"
                                        width={100}
                                        height={100}
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
                        <Button onClick={logout}
                                className="text-red-500 flex flex-row items-center justify-center gap-5 w-full"
                                variant="ghost"><LogOut className="w-5 h-5 text-red-500"/><span>Logout</span></Button>
                    </div>
                </SidebarBody>
            </Sidebar>
            <section className="absolute top-0 right-0 w-full bg-transparent flex justify-between p-4">
                {organization.logo && (
                    <Image
                        src={organization.logo}
                        alt="Arogyam"
                        width={128}
                        height={128}
                        className="ml-2"
                    />
                )}
                <AnimatedThemeToggler className="p-2 rounded-full hover:bg-accent  bg-background"/>
            </section>
        </>
    );
}