"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const features = [
    {
        title: "AI Diagnostics",
        description: "Our advanced AI analyzes your symptoms in real-time, providing preliminary insights with 99% accuracy compared to initial triage.",
        content: (
            <div className="h-full w-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                AI Analysis Visualization
            </div>
        ),
    },
    {
        title: "Instant Connections",
        description: "Connect with available specialists within minutes. No more waiting weeks for an appointment.",
        content: (
            <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                Video Call Interface
            </div>
        ),
    },
    {
        title: "Smart Prescriptions",
        description: "Digital prescriptions sent directly to your preferred pharmacy. Track refills and get reminders automatically.",
        content: (
            <div className="h-full w-full bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                Rx Management UI
            </div>
        ),
    },
]

export function ScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    return (
        <section ref={containerRef} className="relative bg-slate-50">
            {features.map((feature, index) => {
                const targetScale = 1 - (features.length - index) * 0.05
                const range = [index * 0.25, 1]

                return (
                    <Card
                        key={index}
                        i={index}
                        {...feature}
                        progress={scrollYProgress}
                        range={[index * 0.25, 1]}
                        targetScale={targetScale}
                    />
                )
            })}
        </section>
    )
}

interface CardProps {
    i: number
    title: string
    description: string
    content: React.ReactNode
    progress: any
    range: [number, number]
    targetScale: number
}

const Card = ({ i, title, description, content, progress, range, targetScale }: CardProps) => {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale])

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                className="relative flex flex-col md:flex-row h-[70vh] w-[90vw] md:w-[80vw] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden origin-top"
            >
                {/* Text Side */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">{title}</h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{description}</p>
                    <button className="mt-8 px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 w-fit transition-colors">
                        Learn more
                    </button>
                </div>

                {/* Visual Side */}
                <div className="flex-1 relative h-full w-full overflow-hidden bg-slate-100">
                    <motion.div style={{ scale: imageScale }} className="h-full w-full p-8">
                        {content}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
