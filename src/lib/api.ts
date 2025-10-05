// Client-side API functions that call our API routes

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// Types for API responses with relations
export interface AppointmentWithRelations {
  id: string
  doctorId: string | null
  patientId: string
  dateTime: Date
  status: string
  createdAt: Date
  updatedAt: Date
  patient?: {
    id: string
    name: string
    email: string | null
    phone: string | null
  }
  doctor?: {
    id: string
    name: string
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new ApiError(response.status, errorData.error || 'Request failed')
  }
  return response.json()
}

// Appointment API functions
export const appointmentApi = {
  async getAppointments(doctorId: string): Promise<AppointmentWithRelations[]> {
    const response = await fetch(`/api/appointments?doctorId=${doctorId}`)
    return handleResponse<AppointmentWithRelations[]>(response)
  },

  async createAppointment(data: {
    patientId: string
    doctorId: string
    dateTime: Date
    status?: string
  }) {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        dateTime: data.dateTime.toISOString()
      })
    })
    return handleResponse(response)
  },

  async updateAppointment(id: string, data: {
    status?: string
    dateTime?: Date
  }) {
    const response = await fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        ...(data.dateTime && { dateTime: data.dateTime.toISOString() })
      })
    })
    return handleResponse(response)
  },

  async deleteAppointment(id: string) {
    const response = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  }
}

// Patient API functions
export const patientApi = {
  async getPatients(doctorId: string): Promise<any[]> {
    const response = await fetch(`/api/patients?doctorId=${doctorId}`)
    return handleResponse<any[]>(response)
  }
}

// Program API functions
export const programApi = {
  async getPrograms(organizationId: string, options?: {
    patientId?: string
    type?: 'generic' | 'patient-specific'
  }): Promise<any[]> {
    const params = new URLSearchParams({ organizationId })
    if (options?.patientId) params.append('patientId', options.patientId)
    if (options?.type) params.append('type', options.type)
    
    const response = await fetch(`/api/programs?${params}`)
    return handleResponse<any[]>(response)
  },

  async createProgram(data: {
    organizationId: string
    patientId?: string
    name: string
    description?: string
    startDate?: Date
    endDate?: Date
    isGeneric?: boolean
  }) {
    const response = await fetch('/api/programs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        startDate: data.startDate?.toISOString(),
        ...(data.endDate && { endDate: data.endDate.toISOString() })
      })
    })
    return handleResponse(response)
  },

  async updateProgram(id: string, data: {
    name?: string
    description?: string
    startDate?: Date
    endDate?: Date
    patientId?: string | null
    status?: string
  }) {
    const response = await fetch(`/api/programs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        ...(data.startDate && { startDate: data.startDate.toISOString() }),
        ...(data.endDate && { endDate: data.endDate.toISOString() })
      })
    })
    return handleResponse(response)
  },

  async assignProgramToPatient(programId: string, patientId: string) {
    const response = await fetch(`/api/programs/${programId}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientId })
    })
    return handleResponse(response)
  },

  async unassignProgramFromPatient(programId: string) {
    const response = await fetch(`/api/programs/${programId}/unassign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return handleResponse(response)
  },

  async deleteProgram(id: string) {
    const response = await fetch(`/api/programs/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  }
}

// Exercise API functions
export const exerciseApi = {
  async getExercises(organizationId: string, programId?: string): Promise<any[]> {
    const params = new URLSearchParams({ organizationId })
    if (programId) params.append('programId', programId)
    
    const response = await fetch(`/api/exercises?${params}`)
    return handleResponse<any[]>(response)
  },

  async createExercise(data: {
    programId: string
    name: string
    description?: string
    repetitions?: number
    sets?: number
    duration?: number
    youtubeLink?: string
  }) {
    const response = await fetch('/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async updateExercise(id: string, data: {
    name?: string
    description?: string
    repetitions?: number
    sets?: number
    duration?: number
    youtubeLink?: string
  }) {
    const response = await fetch(`/api/exercises/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async deleteExercise(id: string) {
    const response = await fetch(`/api/exercises/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  }
}

// Exercise Template API functions
export const exerciseTemplateApi = {
  async getExerciseTemplates(organizationId: string, category?: string): Promise<any[]> {
    const params = new URLSearchParams({ organizationId })
    if (category) params.append('category', category)
    
    const response = await fetch(`/api/exercise-templates?${params}`)
    return handleResponse<any[]>(response)
  },

  async createExerciseTemplate(data: {
    organizationId: string
    name: string
    description?: string
    category?: string
    repetitions?: number
    sets?: number
    duration?: number
    youtubeLink?: string
  }) {
    const response = await fetch('/api/exercise-templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async updateExerciseTemplate(id: string, data: {
    name?: string
    description?: string
    category?: string
    repetitions?: number
    sets?: number
    duration?: number
    youtubeLink?: string
    isActive?: boolean
  }) {
    const response = await fetch(`/api/exercise-templates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async deleteExerciseTemplate(id: string) {
    const response = await fetch(`/api/exercise-templates/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  }
}

// Case Paper API functions
export const casePaperApi = {
  async getCasePapers(patientId: string): Promise<any[]> {
    const response = await fetch(`/api/case-papers?patientId=${patientId}`)
    return handleResponse<any[]>(response)
  },

  async createCasePaper(data: {
    patientId: string
    diagnosis: string
    history?: string
  }) {
    const response = await fetch('/api/case-papers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async updateCasePaper(id: string, data: {
    diagnosis?: string
    history?: string
  }) {
    const response = await fetch(`/api/case-papers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async deleteCasePaper(id: string) {
    const response = await fetch(`/api/case-papers/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  }
}
