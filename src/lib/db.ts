export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  medicalHistory: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  duration: number
  type: "consultation" | "follow-up" | "procedure" | "emergency"
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  notes: string
  createdAt: string
  updatedAt: string
}

export interface CasePaper {
  id: string
  patientId: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  uploadedBy: string
  createdAt: string
  tags: string[]
}

export interface Program {
  id: string
  name: string
  description: string
  category: string
  duration: number
  exercises: Exercise[]
  assignedPatients: string[]
  createdBy: string
  createdAt: string
  status: "active" | "draft" | "archived"
}

export interface Exercise {
  id: string
  name: string
  description: string
  sets: number
  reps: number
  duration: number
  instructions: string[]
}

// Mock data for development
export const mockPatients: Patient[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0123",
    dateOfBirth: "1985-06-15",
    address: "123 Main St, City, State 12345",
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1-555-0124",
      relationship: "Spouse",
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0125",
    dateOfBirth: "1992-03-22",
    address: "456 Oak Ave, City, State 12345",
    medicalHistory: ["Asthma"],
    emergencyContact: {
      name: "Mike Johnson",
      phone: "+1-555-0126",
      relationship: "Brother",
    },
    createdAt: "2024-01-16T14:30:00Z",
    updatedAt: "2024-01-16T14:30:00Z",
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    doctorId: "dr1",
    date: "2024-01-20",
    time: "10:00",
    duration: 30,
    type: "consultation",
    status: "scheduled",
    notes: "Regular checkup",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    patientId: "2",
    doctorId: "dr1",
    date: "2024-01-20",
    time: "14:30",
    duration: 45,
    type: "follow-up",
    status: "confirmed",
    notes: "Follow-up for asthma treatment",
    createdAt: "2024-01-16T14:30:00Z",
    updatedAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "3",
    patientId: "1",
    doctorId: "dr2",
    date: "2024-01-21",
    time: "09:00",
    duration: 60,
    type: "procedure",
    status: "scheduled",
    notes: "Blood work and tests",
    createdAt: "2024-01-17T09:00:00Z",
    updatedAt: "2024-01-17T09:00:00Z",
  },
  {
    id: "4",
    patientId: "2",
    doctorId: "dr3",
    date: "2024-01-22",
    time: "11:00",
    duration: 30,
    type: "consultation",
    status: "completed",
    notes: "Initial consultation completed",
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-18T11:00:00Z",
  },
]

// Mock case papers data
export const mockCasePapers: CasePaper[] = [
  {
    id: "1",
    patientId: "1",
    title: "Blood Test Results - January 2024",
    description: "Complete blood count and metabolic panel results",
    fileUrl: "/documents/blood-test-john-doe-jan2024.pdf",
    fileType: "application/pdf",
    uploadedBy: "Dr. Smith",
    createdAt: "2024-01-15T10:00:00Z",
    tags: ["Lab Results", "Blood Work", "Routine"],
  },
  {
    id: "2",
    patientId: "1",
    title: "Chest X-Ray",
    description: "Routine chest X-ray examination",
    fileUrl: "/documents/chest-xray-john-doe.jpg",
    fileType: "image/jpeg",
    uploadedBy: "Dr. Johnson",
    createdAt: "2024-01-10T14:30:00Z",
    tags: ["X-Ray", "Imaging", "Chest"],
  },
  {
    id: "3",
    patientId: "2",
    title: "Asthma Treatment Plan",
    description: "Updated treatment plan for asthma management",
    fileUrl: "/documents/asthma-plan-sarah-johnson.pdf",
    fileType: "application/pdf",
    uploadedBy: "Dr. Williams",
    createdAt: "2024-01-12T09:15:00Z",
    tags: ["Treatment Plan", "Asthma", "Respiratory"],
  },
  {
    id: "4",
    patientId: "2",
    title: "Insurance Authorization",
    description: "Pre-authorization for specialist referral",
    fileUrl: "/documents/insurance-auth-sarah-johnson.pdf",
    fileType: "application/pdf",
    uploadedBy: "Admin Staff",
    createdAt: "2024-01-08T16:45:00Z",
    tags: ["Insurance", "Authorization", "Referral"],
  },
  {
    id: "5",
    patientId: "1",
    title: "MRI Scan - Brain",
    description: "Brain MRI scan for headache evaluation",
    fileUrl: "/documents/mri-brain-john-doe.dicom",
    fileType: "application/dicom",
    uploadedBy: "Dr. Martinez",
    createdAt: "2024-01-05T11:20:00Z",
    tags: ["MRI", "Brain", "Imaging", "Neurology"],
  },
  {
    id: "6",
    patientId: "2",
    title: "Prescription Record",
    description: "Current medications and dosage information",
    fileUrl: "/documents/prescription-sarah-johnson.pdf",
    fileType: "application/pdf",
    uploadedBy: "Dr. Smith",
    createdAt: "2024-01-03T13:10:00Z",
    tags: ["Prescription", "Medications", "Pharmacy"],
  },
]

// Mock programs data
export const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Post-Surgery Knee Rehabilitation",
    description: "Comprehensive rehabilitation program for patients recovering from knee surgery",
    category: "rehabilitation",
    duration: 12,
    exercises: [
      {
        id: "ex1",
        name: "Quad Sets",
        description: "Isometric quadriceps strengthening exercise",
        sets: 3,
        reps: 10,
        duration: 5,
        instructions: [
          "Lie on your back with legs straight",
          "Tighten thigh muscles and press knee down",
          "Hold for 5 seconds, then relax",
        ],
      },
      {
        id: "ex2",
        name: "Heel Slides",
        description: "Range of motion exercise for knee flexion",
        sets: 2,
        reps: 15,
        duration: 8,
        instructions: [
          "Lie on your back with affected leg straight",
          "Slowly slide heel toward buttocks",
          "Return to starting position",
        ],
      },
    ],
    assignedPatients: ["1", "2"],
    createdBy: "Dr. Smith",
    createdAt: "2024-01-10T09:00:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Cardiac Fitness Program",
    description: "Low-impact cardiovascular fitness program for heart health",
    category: "fitness",
    duration: 8,
    exercises: [
      {
        id: "ex3",
        name: "Walking",
        description: "Moderate-pace walking exercise",
        sets: 1,
        reps: 1,
        duration: 30,
        instructions: [
          "Start with 5-minute warm-up walk",
          "Maintain steady, comfortable pace",
          "Cool down with 5-minute slow walk",
        ],
      },
      {
        id: "ex4",
        name: "Arm Circles",
        description: "Upper body warm-up and mobility exercise",
        sets: 2,
        reps: 20,
        duration: 3,
        instructions: [
          "Stand with arms extended to sides",
          "Make small circles forward for 10 reps",
          "Reverse direction for 10 reps",
        ],
      },
    ],
    assignedPatients: ["1"],
    createdBy: "Dr. Johnson",
    createdAt: "2024-01-12T14:30:00Z",
    status: "active",
  },
  {
    id: "3",
    name: "Lower Back Pain Management",
    description: "Therapeutic exercises for chronic lower back pain relief",
    category: "therapy",
    duration: 6,
    exercises: [
      {
        id: "ex5",
        name: "Cat-Cow Stretch",
        description: "Spinal mobility and flexibility exercise",
        sets: 2,
        reps: 10,
        duration: 5,
        instructions: [
          "Start on hands and knees",
          "Arch back and look up (cow pose)",
          "Round back and tuck chin (cat pose)",
        ],
      },
      {
        id: "ex6",
        name: "Pelvic Tilts",
        description: "Core strengthening and spinal alignment exercise",
        sets: 3,
        reps: 12,
        duration: 6,
        instructions: [
          "Lie on back with knees bent",
          "Tilt pelvis to flatten lower back",
          "Hold for 3 seconds, then relax",
        ],
      },
    ],
    assignedPatients: ["2"],
    createdBy: "Dr. Williams",
    createdAt: "2024-01-08T11:15:00Z",
    status: "active",
  },
  {
    id: "4",
    name: "Senior Mobility Maintenance",
    description: "Gentle exercises to maintain mobility and prevent falls in seniors",
    category: "maintenance",
    duration: 16,
    exercises: [
      {
        id: "ex7",
        name: "Chair Stands",
        description: "Functional strength exercise for legs",
        sets: 2,
        reps: 8,
        duration: 4,
        instructions: ["Sit in sturdy chair with arms crossed", "Stand up without using hands", "Sit back down slowly"],
      },
    ],
    assignedPatients: [],
    createdBy: "Dr. Martinez",
    createdAt: "2024-01-05T16:20:00Z",
    status: "draft",
  },
]
