import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import userReducer from "@/data/reducers/user-reducer"
import doctorReducer from "@/data/reducers/doctor-reducer"

const rootReducer = combineReducers({
    user: userReducer,
    doctor: doctorReducer,
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "doctor"], // ✅ choose which slices to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist stores non-serializable stuff internally
        }),
})

export const persistor = persistStore(store)

// Types for hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
