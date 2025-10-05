import { NextRequest, NextResponse } from "next/server";
import { getDoctorDashboardData } from "@/data/services/doctorServices";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); // ✅ extract id from query params

        if (!id) {
            return NextResponse.json(
                { error: "Doctor ID is required" },
                { status: 400 }
            );
        }

        const data = await getDoctorDashboardData(id);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
