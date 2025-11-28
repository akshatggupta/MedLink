"use client"

import { motion } from "framer-motion"
import { Search, UserPlus, CalendarCheck, MessageSquare } from "lucide-react"

const steps = [
    {
        icon: Search,
        title: "Find a Doctor",
        description: "Search by specialty, location, or name to find the right expert for you.",
    },
    {
        icon: UserPlus,
        title: "Create Profile",
        description: "Sign up and build your health profile to keep track of your history.",
    },
    {
        icon: CalendarCheck,
        title: "Book Appointment",
        description: "Choose a time that works for you and confirm your booking instantly.",
    },
    {
        icon: MessageSquare,
        title: "Get Care",
        description: "Connect via video call or visit in-person. Get prescriptions digitally.",
    },
]

export function HowItWorks() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl mix-blend-screen animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Simple Steps to Better Health
                    </h2>
                    <p className="text-lg text-slate-300">
                        Getting the care you need shouldn't be complicated. We've streamlined the process.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20 group hover:bg-blue-600 transition-colors duration-300">
                                    <step.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
