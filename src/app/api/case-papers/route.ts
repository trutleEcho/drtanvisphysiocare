import { NextRequest, NextResponse } from "next/server"
import { getCasePapers, createCasePaper } from "@/data/services/casePaperServices"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patientId")

    if (!patientId) {
      return NextResponse.json({ error: "Patient ID is required" }, { status: 400 })
    }

    const casePapers = await getCasePapers({
      where: {
        patientId: patientId
      },
      include: {
        patient: true
      }
    })

    return NextResponse.json(casePapers)
  } catch (error: any) {
    console.error("Error fetching case papers:", error)
    return NextResponse.json(
      { error: "Failed to fetch case papers" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientId, diagnosis, history } = body

    if (!patientId || !diagnosis) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const casePaper = await createCasePaper({
      patientId,
      diagnosis,
      history
    })

    return NextResponse.json(casePaper, { status: 201 })
  } catch (error: any) {
    console.error("Error creating case paper:", error)
    return NextResponse.json(
      { error: "Failed to create case paper" },
      { status: 500 }
    )
  }
}
