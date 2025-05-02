import type React from "react"
export const metadata = {
  title: "uefy0",
  description: "editor, 3d artist blabla idk",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


import './globals.css'