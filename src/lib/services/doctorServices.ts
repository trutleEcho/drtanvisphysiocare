import {supabase} from "../supbaseClient";
import {prisma} from "@/lib/prisma";

export async function getProfileAndRole(userId: string) {
    const {data: profile, error: profileError} = await supabase
        .from("profiles")
        .select("id, role")
        .eq("user_id", userId)
        .single();

    if (profileError) throw profileError;

    let doctorData = null;
    if (profile.role === "doctor") {
        const {data: doctor, error: doctorError} = await supabase
            .from("Doctor")
            .select("*")
            .eq("profile_id", profile.id);

        if (doctorError) throw doctorError;
        doctorData = doctor;
    }

    return {profile, doctorData};
}

export async function getDoctorById(id: string) {
    const doctor = await prisma.doctor.findUnique({
        where: {id},
    });

    if (!doctor) {
        throw new Error(`Doctor with ID ${id} not found`);
    }

    return doctor;
}