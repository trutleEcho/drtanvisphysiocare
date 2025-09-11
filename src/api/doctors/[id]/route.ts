import { NextRequest, NextResponse } from "next/server";
import { getDoctorById } from "@/lib/services/doctorServices"; // adjust path

/**
 * GET /api/doctor/:id
 * Returns doctor by ID
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const doctor = await getDoctorById(params.id);
        return NextResponse.json(doctor, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message ?? "Doctor not found" },
            { status: 404 }
        );
    }
}
