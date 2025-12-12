"use client"

import { motion } from "framer-motion"
import { Calendar, Shield, Activity, Smartphone } from "lucide-react"

const features = [
    {
        icon: Calendar,
        title: "Instant Booking",
        description: "Book appointments with top specialists in seconds. Real-time availability.",
        color: "bg-green-500",
    },
    {
        icon: Shield,
        title: "Secure Records",
        description: "Your health data is encrypted and protected with enterprise-grade security.",
        color: "bg-cyan-500",
    },
    {
        icon: Activity,
        title: "AI Health Assistant",
        description: "Get 24/7 answers to your health questions from our advanced AI.",
        color: "bg-indigo-500",
    },
    {
        icon: Smartphone,
        title: "Video Consultations",
        description: "Connect with doctors from the comfort of your home via HD video.",
        color: "bg-violet-500",
    },
]

export function Features() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Why Choose MedLink?
                    </h2>
                    <p className="text-lg text-slate-600">
                        We combine cutting-edge technology with compassionate care to bring you the best healthcare experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-green-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
