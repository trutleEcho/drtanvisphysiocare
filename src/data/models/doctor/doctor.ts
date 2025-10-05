export interface Doctor{
    id: string
    name: string
    email: string | null
    phone: string | null
    specialization: string | null
    avatar: string | null
    organizationId: string
    createdAt: string // ISO string (from API)
    updatedAt: string // ISO string (from API)
}