import { NextRequest, NextResponse } from "next/server";
import { getDoctorByEmail } from "@/lib/services/doctorServices"; // adjust path

/**
 * GET /api/doctors/:email
 * Returns doctor by Email
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { email: string } }
) {
    try {
        const email = params.email
        const doctor = await getDoctorByEmail(email)
        return NextResponse.json(doctor, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message ?? "Doctor not found" },
            { status: 404 }
        )
    }
}

