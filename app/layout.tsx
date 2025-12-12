import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SmoothScroll } from "@/components/providers/SmoothScroll"
import { FloatingAssistant } from "@/components/ai/FloatingAssistant"
import { ThemeProvider } from "next-themes";
import Providers from "@/components/Providers";
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "HealthCare - Find & Book Doctors",
  description: "Find and book appointments with qualified healthcare professionals",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">

      <body className={`${_geist.className} ${_geistMono.className} ${playfair.variable} antialiased bg-slate-50 text-slate-900`}>
        <Providers>
         <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <FloatingAssistant />
              <Footer />
            </div>
          </SmoothScroll>
        </AuthProvider>
        <Analytics />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
