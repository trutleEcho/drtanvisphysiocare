import { NextRequest, NextResponse } from "next/server"
import { getPatients } from "@/data/services/patientServices"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get("doctorId")

    if (!doctorId) {
      return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 })
    }

    const patients = await getPatients({
      where: {
        doctorId: doctorId
      }
    })

    return NextResponse.json(patients)
  } catch (error: any) {
    console.error("Error fetching patients:", error)
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    )
  }
}
