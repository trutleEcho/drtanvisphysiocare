import {redirect} from "next/navigation"
import {createClient} from "@/lib/server";


export default async function RootPage() {
    const supabase = await createClient()

    const {data: userData} = await supabase.auth.getUser()

    if (!userData?.user) {
        redirect("/auth/login")
    }

    const role = userData.user.user_metadata.role

    if (role === "organization") {
        redirect("/a/m")
    }

    if (role === "doctor") {
        redirect("/a/n")
    }

    if (role === "employee") {
        redirect("/a/o")
    }

    if (role === "patient") {
        redirect("/a/p")
    }
}
