import { NextRequest, NextResponse } from "next/server"
import { getPrograms, createProgram } from "@/data/services/programServices"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get("organizationId")
    const patientId = searchParams.get("patientId")

    if (!organizationId) {
      return NextResponse.json({ error: "Organization ID is required" }, { status: 400 })
    }

    const query: any = {
      where: {
        organizationId: organizationId
      },
      include: {
        patient: true,
        exercises: true
      }
    }

    if (patientId) {
      query.where.patientId = patientId
    }

    const programs = await getPrograms(query)
    return NextResponse.json(programs)
  } catch (error: any) {
    console.error("Error fetching programs:", error)
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, patientId, name, description, startDate, endDate } = body

    if (!organizationId || !patientId || !name || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const program = await createProgram({
      organizationId,
      patientId,
      name,
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null
    })

    return NextResponse.json(program, { status: 201 })
  } catch (error: any) {
    console.error("Error creating program:", error)
    return NextResponse.json(
      { error: "Failed to create program" },
      { status: 500 }
    )
  }
}
