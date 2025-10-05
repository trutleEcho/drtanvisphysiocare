import { NextRequest, NextResponse } from "next/server"
import { updateCasePaper, deleteCasePaper } from "@/data/services/casePaperServices"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { diagnosis, history } = body

    const casePaper = await updateCasePaper(params.id, {
      ...(diagnosis && { diagnosis }),
      ...(history && { history })
    })

    return NextResponse.json(casePaper)
  } catch (error: any) {
    console.error("Error updating case paper:", error)
    return NextResponse.json(
      { error: "Failed to update case paper" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const casePaper = await deleteCasePaper(params.id)
    return NextResponse.json(casePaper)
  } catch (error: any) {
    console.error("Error deleting case paper:", error)
    return NextResponse.json(
      { error: "Failed to delete case paper" },
      { status: 500 }
    )
  }
}
