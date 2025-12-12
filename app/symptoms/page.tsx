"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { symptoms, doctors } from "@/lib/mock-data"
import { symptomToSpecialties, symptomSeverity, severityAdvice } from "@/lib/symptom-mapping"
import { X, AlertCircle, AlertTriangle, Info, CheckCircle2, ArrowRight } from "lucide-react"

export default function SymptomsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const getRecommendedSpecialties = () => {
    const specialtyCount: Record<string, number> = {}
    selectedSymptoms.forEach((symptom) => {
      const specialties = symptomToSpecialties[symptom] || []
      specialties.forEach((specialty) => {
        specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1
      })
    })
    return Object.entries(specialtyCount)
      .sort(([, a], [, b]) => b - a)
      .map(([specialty]) => specialty)
  }

  const getMaxSeverity = () => {
    if (selectedSymptoms.length === 0) return "low"
    const severities = selectedSymptoms.map((s) => symptomSeverity[s] || "low")
    if (severities.includes("high")) return "high"
    if (severities.includes("medium")) return "medium"
    return "low"
  }

  const recommendedSpecialties = getRecommendedSpecialties()
  const maxSeverity = getMaxSeverity()
  const recommendedDoctors = doctors.filter((doctor) => recommendedSpecialties.includes(doctor.specialty))

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="text-destructive" size={32} />
      case "medium":
        return <AlertCircle className="text-yellow-500" size={32} />
      default:
        return <Info className="text-green-500" size={32} />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 border-destructive/30"
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30"
      default:
        return "bg-green-500/10 border-green-500/30"
    }
  }

  const handleNextStep = () => {
    if (selectedSymptoms.length > 0) {
      setCurrentStep(2)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
    setCurrentStep(3)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Symptom Checker</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your symptoms and get personalized doctor recommendations
            </p>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-timberwolf/5">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-foreground">Step {currentStep} of 3</span>
              <span className="text-sm text-muted-foreground">
                {currentStep === 1 && "Select Symptoms"}
                {currentStep === 2 && "Review Selection"}
                {currentStep === 3 && "Your Results"}
              </span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent smooth-transition" style={{ width: `${(currentStep / 3) * 100}%` }} />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Step 1: Select Symptoms */}
            {currentStep === 1 && (
              <Card className="p-8 md:p-10 rounded-2xl border-border animate-fade-in">
                <h2 className="text-2xl font-bold mb-8 text-foreground">What symptoms are you experiencing?</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-4 py-4 rounded-xl font-medium smooth-transition border-2 ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-accent text-accent-foreground border-accent"
                          : "bg-white text-foreground border-border hover:border-accent"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="mb-8 p-6 rounded-xl bg-accent/10 border border-accent/30">
                    <p className="text-sm font-bold text-foreground mb-3">Selected ({selectedSymptoms.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <div
                          key={symptom}
                          className="flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full"
                        >
                          <span className="text-sm font-medium">{symptom}</span>
                          <button onClick={() => toggleSymptom(symptom)} className="hover:opacity-70">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleNextStep}
                  disabled={selectedSymptoms.length === 0}
                  className="w-full bg-accent hover:bg-accent/90 rounded-xl py-6 text-base font-bold smooth-transition"
                >
                  Continue
                  <ArrowRight size={20} />
                </Button>
              </Card>
            )}

            {/* Step 2: Review */}
            {currentStep === 2 && (
              <Card className="p-8 md:p-10 rounded-2xl border-border animate-slide-in-up">
                <h2 className="text-2xl font-bold mb-8 text-foreground">Review Your Symptoms</h2>

                <div className="space-y-6 mb-8">
                  {selectedSymptoms.map((symptom, idx) => (
                    <div
                      key={symptom}
                      className="flex items-center gap-4 p-4 rounded-xl bg-timberwolf/10 border border-border"
                    >
                      <CheckCircle2 size={24} className="text-accent flex-shrink-0" />
                      <span className="text-foreground font-medium flex-1">{symptom}</span>
                      <button onClick={() => toggleSymptom(symptom)} className="text-destructive hover:opacity-70">
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted rounded-xl py-6 font-bold"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-accent hover:bg-accent/90 rounded-xl py-6 font-bold smooth-transition"
                  >
                    Get Results
                    <ArrowRight size={20} />
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && showResults && (
              <div className="space-y-6 animate-slide-in-up">
                {/* Severity Assessment */}
                <Card className={`p-8 rounded-2xl border-2 ${getSeverityColor(maxSeverity)}`}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">{getSeverityIcon(maxSeverity)}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-foreground capitalize">
                        {maxSeverity === "high"
                          ? "Urgent Attention Required"
                          : maxSeverity === "medium"
                            ? "Moderate Symptoms"
                            : "Mild Symptoms"}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{severityAdvice[maxSeverity]}</p>
                    </div>
                  </div>
                </Card>

                {/* Recommended Specialties */}
                {recommendedSpecialties.length > 0 && (
                  <Card className="p-8 rounded-2xl border-border">
                    <h3 className="text-xl font-bold mb-6 text-foreground">Recommended Specialties</h3>
                    <div className="flex flex-wrap gap-3">
                      {recommendedSpecialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-6 py-3 bg-accent/20 text-foreground rounded-full font-bold text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Recommended Doctors */}
                {recommendedDoctors.length > 0 && (
                  <Card className="p-8 rounded-2xl border-border">
                    <h3 className="text-xl font-bold mb-6 text-foreground">Recommended Doctors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className="border border-border rounded-xl p-6 hover-shadow smooth-transition"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-foreground">{doctor.name}</h4>
                              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <span className="text-lg">★</span>
                                <span className="font-bold text-foreground">{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{doctor.location}</p>
                          <p className="text-sm font-bold text-foreground mb-4">${doctor.fee}/consultation</p>
                          <Button asChild className="w-full bg-accent hover:bg-accent/90 rounded-xl" size="sm">
                            <Link href={`/doctor/${doctor.id}`}>View Profile & Book</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Health Tips */}
                <Card className="p-8 rounded-2xl border-border bg-timberwolf/5">
                  <h3 className="text-xl font-bold mb-6 text-foreground">Health Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-muted-foreground">
                      <span className="font-bold text-accent flex-shrink-0 mt-1">•</span>
                      <span>Stay hydrated and get adequate rest</span>
                    </li>
                    <li className="flex gap-3 text-muted-foreground">
                      <span className="font-bold text-accent flex-shrink-0 mt-1">•</span>
                      <span>Avoid self-medication without professional advice</span>
                    </li>
                    <li className="flex gap-3 text-muted-foreground">
                      <span className="font-bold text-accent flex-shrink-0 mt-1">•</span>
                      <span>Monitor your symptoms and seek immediate help if they worsen</span>
                    </li>
                    <li className="flex gap-3 text-muted-foreground">
                      <span className="font-bold text-accent flex-shrink-0 mt-1">•</span>
                      <span>Maintain good hygiene to prevent spreading infections</span>
                    </li>
                  </ul>
                </Card>

                {/* Start Over Button */}
                <Button
                  onClick={() => {
                    setCurrentStep(1)
                    setSelectedSymptoms([])
                    setShowResults(false)
                  }}
                  variant="outline"
                  className="w-full border-border hover:bg-muted rounded-xl py-6 font-bold"
                >
                  Start Over
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
