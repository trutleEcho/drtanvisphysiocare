import { NextRequest, NextResponse } from "next/server"
import { updateAppointment, deleteAppointment } from "@/data/services/appointmentServices"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, dateTime } = body

    const appointment = await updateAppointment(params.id, {
      ...(status && { status }),
      ...(dateTime && { dateTime: new Date(dateTime) })
    })

    return NextResponse.json(appointment)
  } catch (error: any) {
    console.error("Error updating appointment:", error)
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await deleteAppointment(params.id)
    return NextResponse.json(appointment)
  } catch (error: any) {
    console.error("Error deleting appointment:", error)
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    )
  }
}
