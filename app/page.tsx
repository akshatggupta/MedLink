import { Hero } from "@/components/home/Hero"
import { ScrollSection } from "@/components/home/ScrollSection"
import { Features } from "@/components/home/Features"

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <ScrollSection />
      <Features />
    </div>
  )
}
