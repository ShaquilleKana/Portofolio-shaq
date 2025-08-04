"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client" // Import client-side Supabase client

interface Experience {
  id: string
  title: string
  date_range: string
  description: string
  badges: string[]
}

export default function ExperiencesSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("experiences").select("*").order("date_range", { ascending: false }) // Order by date

      if (error) {
        console.error("Error fetching experiences:", error)
        // Fallback to hardcoded experiences if fetching fails
        setExperiences([
          {
            id: "default-1",
            title: "Senior Frontend Developer",
            date_range: "2023 - Present",
            description:
              "Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies. Mentoring junior developers and establishing best practices.",
            badges: ["React", "TypeScript", "Next.js"],
          },
          {
            id: "default-2",
            title: "Full Stack Developer",
            date_range: "2022 - 2023",
            description:
              "Developed and maintained web applications using MERN stack. Collaborated with design teams to implement responsive user interfaces.",
            badges: ["MongoDB", "Express", "React", "Node.js"],
          },
          {
            id: "default-3",
            title: "Data Analyst",
            date_range: "2021 - 2022",
            description:
              "Analyzed large datasets to provide business insights. Created automated reporting systems and data visualizations for stakeholders.",
            badges: ["Python", "SQL", "Tableau", "Google Analytics"],
          },
          {
            id: "default-4",
            title: "Junior Web Developer",
            date_range: "2020 - 2021",
            description:
              "Built responsive websites and web applications. Worked with HTML, CSS, JavaScript, and various CMS platforms.",
            badges: ["HTML", "CSS", "JavaScript", "WordPress"],
          },
          {
            id: "default-5",
            title: "Freelance Developer",
            date_range: "2019 - 2020",
            description:
              "Provided web development services to small businesses. Created custom websites and e-commerce solutions.",
            badges: ["PHP", "MySQL", "Bootstrap", "jQuery"],
          },
          {
            id: "default-6",
            title: "Web Development Intern",
            date_range: "2019",
            description:
              "Assisted in developing company website features. Learned modern web development practices and version control.",
            badges: ["Git", "HTML", "CSS", "JavaScript"],
          },
        ])
      } else if (data) {
        setExperiences(data as Experience[])
      }
      setIsLoading(false)
    }

    fetchExperiences()
  }, [])

  if (isLoading) {
    return (
      <section id="experiences" className="py-20 px-4 bg-[#1c2541]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#6fffe9]">Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="experience-card p-6 rounded-lg animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
                <div className="h-16 bg-gray-700 rounded mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-5 bg-gray-700 rounded-full w-16"></div>
                  <div className="h-5 bg-gray-700 rounded-full w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experiences" className="py-20 px-4 bg-[#1c2541]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#6fffe9]">Experiences</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#6fffe9]">{exp.title}</h3>
              <p className="text-[#5bc0be] mb-3 font-medium">{exp.date_range}</p>
              <p className="text-white mb-4 text-sm leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.badges.map((badge, badgeIndex) => (
                  <span key={badgeIndex} className="badge px-3 py-1 rounded-full text-xs">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
