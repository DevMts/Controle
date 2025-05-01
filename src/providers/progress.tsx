"use client"

import { ProgressProvider } from "@bprogress/next/app"

export function ProgressProviders({ children }: { children: React.ReactNode }) {
  return <ProgressProvider
    height="5px"
    color="#0077ff"
    options={{ showSpinner: false }}
    shallowRouting
  >{children}</ProgressProvider>
}