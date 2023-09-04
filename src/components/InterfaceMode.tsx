'use client'

import { ThemeProvider } from 'next-themes'

export function InterfaceMode({ children } : {children: React.ReactNode}) {
    return <ThemeProvider attribute="class">{children}</ThemeProvider>
}