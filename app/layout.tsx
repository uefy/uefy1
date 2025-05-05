import type React from "react"
export const metadata = {
  title: "i love cats and cats way more better than dogs",
  description: "jk every animal is good ",
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