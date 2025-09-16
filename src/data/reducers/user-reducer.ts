import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {EntityTypes} from "@/data/enums/EntityTypes";

interface User {
    id: string;
    email: string;
    role: EntityTypes;
}

const initialState: User = {
    id: "",
    email: "",
    role: EntityTypes.patient,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<User>) => {
            return action.payload
        },
        clearUser: () => initialState,
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
