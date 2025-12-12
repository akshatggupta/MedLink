import { Hero } from "@/components/home/Hero"
import { ScrollSection } from "@/components/home/ScrollSection"
import { Features } from "@/components/home/Features"
import { HowItWorks } from "@/components/home/HowItWorks"

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <ScrollSection />
      <HowItWorks />
      <Features />
       
     
    </div>
  )
}
