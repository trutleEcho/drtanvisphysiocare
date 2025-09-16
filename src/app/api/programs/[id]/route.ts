import { NextRequest, NextResponse } from "next/server"
import { updateProgram, deleteProgram } from "@/data/services/programServices"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, startDate, endDate } = body

    const program = await updateProgram(params.id, {
      ...(name && { name }),
      ...(description && { description }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(endDate && { endDate: new Date(endDate) })
    })

    return NextResponse.json(program)
  } catch (error: any) {
    console.error("Error updating program:", error)
    return NextResponse.json(
      { error: "Failed to update program" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const program = await deleteProgram(params.id)
    return NextResponse.json(program)
  } catch (error: any) {
    console.error("Error deleting program:", error)
    return NextResponse.json(
      { error: "Failed to delete program" },
      { status: 500 }
    )
  }
}
