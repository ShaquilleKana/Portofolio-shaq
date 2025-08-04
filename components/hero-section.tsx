"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client" // Import client-side Supabase client

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [subtitles, setSubtitles] = useState<string[]>([]) // State to store fetched subtitles
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubtitles = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("hero_subtitles")
        .select("subtitle")
        .order("order_index", { ascending: true })

      if (error) {
        console.error("Error fetching hero subtitles:", error)
        // Fallback to hardcoded texts if fetching fails
        setSubtitles(["Website Developer", "Programmer", "Data Analyst"])
      } else if (data) {
        const fetched = data.map((item) => item.subtitle)
        setSubtitles(fetched.length > 0 ? fetched : ["Website Developer", "Programmer", "Data Analyst"]) // Fallback if no data
      }
      setIsLoading(false)
    }

    fetchSubtitles()
  }, [])

  useEffect(() => {
    if (subtitles.length > 0) {
      const interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % subtitles.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [subtitles]) // Re-run effect when subtitles change

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1c2541]"
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Loading...</h1>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1c2541]">
      {/* Animated Triangles */}
      <div className="triangle triangle-1"></div>
      <div className="triangle triangle-2"></div>
      <div className="triangle triangle-3"></div>

      <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 hover:scale-105 transition-transform duration-300 glow-text text-white">
          Hello I'm Shaq
        </h1>
        <div className="text-xl md:text-2xl mb-8 h-8 text-white">
          <span className="typewriter">I'm a {subtitles[currentTextIndex]}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection("about")}
            className="px-8 py-3 bg-[#5bc0be] text-[#0b132b] font-semibold rounded-lg hover:bg-[#6fffe9] hover:shadow-lg hover:shadow-[#5bc0be]/30 transition-all duration-300"
          >
            Get to know me
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3 border-2 border-[#5bc0be] text-[#5bc0be] font-semibold rounded-lg hover:bg-[#5bc0be] hover:text-[#0b132b] hover:shadow-lg hover:shadow-[#5bc0be]/30 transition-all duration-300"
          >
            Contact me
          </button>
        </div>
      </div>
    </section>
  )
}
