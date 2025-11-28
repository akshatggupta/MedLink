"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Doctor } from "@/lib/mock-data"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

interface BookingModalProps {
    doctor: Doctor
    trigger?: React.ReactNode
}

export function BookingModal({ doctor, trigger }: BookingModalProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [time, setTime] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleBook = () => {
        // Handle booking logic here
        console.log("Booking for", doctor.name, "on", date, "at", time)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || <Button>Book Appointment</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book with {doctor.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Select Date</Label>
                        <div className="border rounded-md p-2 flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Select Time</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((t) => (
                                <Button
                                    key={t}
                                    variant={time === t ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setTime(t)}
                                    className="w-full"
                                >
                                    {t}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleBook} disabled={!date || !time}>Confirm Booking</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
