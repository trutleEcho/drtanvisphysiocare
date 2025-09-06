import type React from "react"
import type {Metadata} from "next"
import {GeistSans} from "geist/font/sans"
import {GeistMono} from "geist/font/mono"
import {Analytics} from "@vercel/analytics/next"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "Dr. Tanvis PhysioCare",
    description: "CRM for Physiotherapy Practice",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class"
                       defaultTheme="dark"
                       enableSystem
                       disableTransitionOnChange>
            {children}
        </ThemeProvider>
        <Analytics/>
        </body>
        </html>
    )
}
