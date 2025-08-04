"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client" // Import client-side Supabase client

export default function AboutSection() {
  const [description, setDescription] = useState("")
  const [profileImageUrl, setProfileImageUrl] = useState("/placeholder.svg?height=200&width=200")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAboutContent = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("about_content").select("*").single()

      if (error && error.code !== "PGRST116") {
        // PGRST116 means "no rows found"
        console.error("Error fetching about content:", error)
        // Fallback to default content if fetching fails
        setDescription(
          "I'm a web developer with a strong interest in user interface design, front-end architecture, and digital project management. I've built a variety of websites—from landing pages and e-commerce platforms to internal company systems—focusing on clean, responsive code and a smooth user experience.",
        )
        setProfileImageUrl("/placeholder.svg?height=200&width=200")
      } else if (data) {
        setDescription(data.description || "Default description from fallback.")
        setProfileImageUrl(data.profile_image_url || "/placeholder.svg?height=200&width=200")
      } else {
        // If no data found (PGRST116 error), use default content
        setDescription(
          "I'm a web developer with a strong interest in user interface design, front-end architecture, and digital project management. I've built a variety of websites—from landing pages and e-commerce platforms to internal company systems—focusing on clean, responsive code and a smooth user experience.",
        )
        setProfileImageUrl("/placeholder.svg?height=200&width=200")
      }
      setIsLoading(false)
    }

    fetchAboutContent()
  }, [])

  if (isLoading) {
    return (
      <section id="about" className="py-20 px-4 bg-[#1c2541]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <div className="w-72 h-72 rounded-full mx-auto border-4 border-[#5bc0be] object-cover shadow-lg shadow-[#5bc0be]/30 flex items-center justify-center text-white">
              Loading image...
            </div>
          </div>
          <p className="text-lg leading-relaxed text-white max-w-3xl mx-auto">Loading description...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 px-4 bg-[#1c2541]">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <img
            src={profileImageUrl || "/placeholder.svg"}
            alt="Shaq Profile"
            className="w-72 h-72 rounded-full mx-auto border-4 border-[#5bc0be] object-cover shadow-lg shadow-[#5bc0be]/30"
          />
        </div>
        <p className="text-lg leading-relaxed text-white max-w-3xl mx-auto">{description}</p>
      </div>
    </section>
  )
}
