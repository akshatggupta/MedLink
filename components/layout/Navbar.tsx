"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"   // ✅ AUTH ADDED

const navItems = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
  { name: "Pharmacy", href: "/pharmacy" },
  { name: "AI Assistant", href: "/ai-assistant" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const { user, logout } = useAuth()   // ✅ AUTH STATE

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Centered Floating Nav Island */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "pointer-events-auto hidden md:flex items-center gap-1 px-2 py-2 bg-white/80 backdrop-blur-md border border-white/20 shadow-lg shadow-slate-200/50 rounded-full transition-all duration-300",
            scrolled ? "py-2 px-4 bg-white/90" : "py-3 px-6"
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-full transition-colors hover:text-slate-900",
                pathname === item.href
                  ? "text-slate-900 font-semibold bg-slate-100"
                  : "text-slate-500"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* ✅ AUTH BUTTON (DESKTOP) */}
          {!user ? (
            <Link
              href="/login"
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-full transition-colors hover:text-slate-900",
                pathname === "/login"
                  ? "text-slate-900 font-semibold bg-slate-100"
                  : "text-slate-500"
              )}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="relative px-4 py-2 text-sm font-medium rounded-full text-slate-500  hover:text-slate-900 transition-colors"
            >
              Logout
            </button>
          )}

        </motion.nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-slate-100 text-slate-600"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-6"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-600 hover:text-[#14532D] p-2"
                >
                  {item.name}
                </Link>
              ))}

              <hr className="border-slate-100" />

              {/* ✅ AUTH BUTTON (MOBILE) */}
              {!user ? (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-lg font-medium text-white bg-[#14532D] py-3 rounded-xl shadow-lg shadow-blue-200"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="text-center text-lg font-medium text-white bg-red-600 py-3 rounded-xl shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
