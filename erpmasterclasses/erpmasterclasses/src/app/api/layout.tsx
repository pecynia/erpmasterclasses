import '../../styles/globals.css'

export const metadata = {
  title: 'API Endpoint',
  description: 'API Endpoint',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
