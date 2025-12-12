"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FloatingAssistant() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="relative"
                    >
                        <Button
                            asChild
                            className="h-14 w-14 rounded-full bg-gradient-to-r from-green-600 to-cyan-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all p-0"
                        >
                            <Link href="/ai-assistant">
                                <Sparkles className="w-6 h-6 text-white animate-pulse" />
                            </Link>
                        </Button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-slate-100 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
