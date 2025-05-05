import type React from "react"
export const metadata = {
  title: "Random Cat Generator",
  description: "Free cat generator. New cats every week.",
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