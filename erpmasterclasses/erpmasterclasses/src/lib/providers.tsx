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
        <Toaster position="top-center" duration={1500} richColors expand closeButton />
      </SessionProvider>
    </>
  )
}