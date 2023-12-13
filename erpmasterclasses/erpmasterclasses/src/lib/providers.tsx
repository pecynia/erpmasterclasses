"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

type Props = {
  children?: React.ReactNode
}

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <>
      <SessionProvider>
        {children}
        <Toaster position="top-right" richColors expand closeButton />
      </SessionProvider>
    </>
  )
}