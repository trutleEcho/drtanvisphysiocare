"use client"

import {Provider} from "react-redux"
import {persistor, store} from "@/lib/store"
import {PersistGate} from "redux-persist/integration/react";
import {LoaderOne} from "@/components/ui/loader";

export default function ReduxProvider({children}: { children: React.ReactNode }) {

    return <Provider store={store}>
        <PersistGate loading={<div className="flex items-center justify-center h-screen bg-background"><LoaderOne/></div>}
                     persistor={persistor}>{children}
        </PersistGate>
    </Provider>
}
