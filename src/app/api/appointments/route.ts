import { NextRequest, NextResponse } from "next/server"
import { getAppointmentsWithRelations, createAppointment } from "@/data/services/appointmentServices"
import { getServerSession } from "next-auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get("doctorId")

    if (!doctorId) {
      return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 })
    }

    const appointments = await getAppointmentsWithRelations(doctorId)
    return NextResponse.json(appointments)
  } catch (error: any) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientId, doctorId, dateTime, status } = body

    if (!patientId || !doctorId || !dateTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const appointment = await createAppointment({
      patientId,
      doctorId,
      dateTime: new Date(dateTime),
      status: status || "Scheduled"
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error: any) {
    console.error("Error creating appointment:", error)
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    )
  }
}
