import { prisma } from "@/lib/prisma"; // or lib/prisma-neon
export async function GET() {
    const doctors = await prisma.doctor.findMany();
    return new Response(JSON.stringify(doctors), { status: 200 });
}

export async function POST(req: Request) {
    const body = await req.json();
    const created = await prisma.doctor.create({ data: body });
    return new Response(JSON.stringify(created), { status: 201 });
}
