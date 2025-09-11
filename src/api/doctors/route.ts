import { NextRequest, NextResponse } from "next/server";
import { getProfileAndRole, getDoctorById } from "@/lib/services/doctorServices"; // adjust path

/**
 * GET /api/profile?userId=uuid
 * Returns profile and doctor info (if role=doctor)
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId query param" },
                { status: 400 }
            );
        }

        const result = await getProfileAndRole(userId);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message ?? "Internal server error" },
            { status: 500 }
        );
    }
}
