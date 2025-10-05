import {NextRequest, NextResponse} from "next/server"
import {getPrograms, createProgram} from "@/data/services/programServices"

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url)
        const organizationId = searchParams.get("organizationId")
        const patientId = searchParams.get("patientId")
        const type = searchParams.get("type") // "generic" or "patient-specific"

        if (!organizationId) {
            return NextResponse.json({error: "Organization ID is required"}, {status: 400})
        }

        const query: any = {
            where: {
                organizationId: organizationId
            },
            include: {
                patient: true,
                exercises: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        }

        // Filter by type
        if (type === "generic") {
            query.where.patientId = null
        } else if (type === "patient-specific") {
            query.where.patientId = {not: null}
        }

        // Filter by specific patient
        if (patientId) {
            query.where.patientId = patientId
        }

        const programs = await getPrograms(query)
        return NextResponse.json(programs)
    } catch (error: any) {
        console.error("Error fetching programs:", error)
        return NextResponse.json(
            {error: "Failed to fetch programs"},
            {status: 500}
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {organizationId, patientId, name, description, startDate, endDate, isGeneric} = body

        if (!organizationId || !name) {
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 400}
            )
        }

        // For generic programs, patientId should be null
        // For patient-specific programs, patientId is required
        if (!isGeneric && !patientId) {
            return NextResponse.json(
                {error: "Patient ID is required for patient-specific programs"},
                {status: 400}
            )
        }

        const program = await createProgram({
            organizationId: organizationId,
            patientId: isGeneric ? null : patientId,
            name: name,
            description: description,
            startDate: startDate ? new Date(startDate) : new Date(),
            endDate: endDate ? new Date(endDate) : null
        })

        return NextResponse.json(program, {status: 201})
    } catch (error: any) {
        console.error("Error creating program:", error)
        return NextResponse.json(
            {error: "Failed to create program"},
            {status: 500}
        )
    }
}
