import { createSlice } from "@reduxjs/toolkit"
import {organization} from "@/generated/prisma";

const initialState: organization = {
    id: "",
    name: "",
    logo: null,
    address: null,
    phone: null,
    email: null,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
        setOrganization: (_state, action) => {
            return action.payload
        },
        clearOrganization: () => initialState,
    },
})

export const { setOrganization, clearOrganization } = organizationSlice.actions
export default organizationSlice.reducer
