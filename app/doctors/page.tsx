"use client"

import { useState } from "react"
import { doctors, specialties } from "@/lib/mock-data"
import { DoctorCard } from "@/components/doctors/DoctorCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Map, ListFilter } from "lucide-react"
import { motion } from "framer-motion"

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Find a Specialist</h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search by doctor name or specialty..."
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12 px-6 gap-2">
              <ListFilter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="h-12 px-6 gap-2">
              <Map className="w-4 h-4" />
              Map View
            </Button>
          </div>

          {/* Specialty Tags */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedSpecialty(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedSpecialty === null
                  ? "bg-green-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              All Specialties
            </button>
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => setSelectedSpecialty(specialty.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedSpecialty === specialty.name
                    ? "bg-green-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {specialty.icon} {specialty.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={index} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No doctors found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => { setSearchQuery(""); setSelectedSpecialty(null) }}
              className="mt-2 text-green-600"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
