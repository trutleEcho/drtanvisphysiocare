import { createSlice } from "@reduxjs/toolkit"
import {doctor} from "@/generated/prisma";

const initialState: doctor = {
    id: "",
    organizationId: "",
    name: "",
    specialization: null,
    email: null,
    phone: null,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        setDoctor: (_state, action) => {
            return action.payload
        },
        clearDoctor: () => initialState,
    },
})

export const { setDoctor, clearDoctor } = doctorSlice.actions
export default doctorSlice.reducer
