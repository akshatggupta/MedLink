"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Clock, DollarSign } from "lucide-react"
import { Doctor } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { BookingModal } from "./BookingModal"
import Image from "next/image"

interface DoctorCardProps {
    doctor: Doctor
    index?: number
}

export function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300 group"
        >
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                {/* Placeholder for actual image if available, or a gradient fallback */}
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    {/* Use a generic medical pattern or gradient if no image */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100" />
                </div>

                <div className="absolute bottom-4 left-4 z-20 text-white">
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-white/80 text-xs">({doctor.reviews} reviews)</span>
                    </div>
                    <h3 className="text-lg font-bold">{doctor.name}</h3>
                    <p className="text-sm text-white/90">{doctor.specialty}</p>
                </div>
            </div>

            <div className="p-4 space-y-4">
                <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {doctor.location}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {doctor.experience} years experience
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        ${doctor.fee} / consultation
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <BookingModal
                        doctor={doctor}
                        trigger={
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Book Appointment
                            </Button>
                        }
                    />
                </div>
            </div>
        </motion.div>
    )
}
