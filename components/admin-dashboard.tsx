"use client"

import type React from "react"
import type { ExperienceData } from "@/types" // Declare or import ExperienceData

import { useState, useEffect } from "react"
import { LogOut, Save, Plus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { saveHeroSubtitles, getHeroSubtitles } from "@/app/actions/hero-actions"
import { getAboutContent, saveAboutContent } from "@/app/actions/about-actions"
import { getExperiences, saveExperience, deleteExperience } from "@/app/actions/experiences-actions" // Import Experiences Server Actions

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("hero")

  const handleLogout = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message)
    }
  }

  const tabs = [
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About Section" },
    { id: "experiences", label: "Experiences" },
    { id: "projects", label: "Projects" },
  ]

  return (
    <div className="min-h-screen p-4 bg-[#1c2541]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--fluorescent-cyan)]">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--red-crayola)] text-white rounded-lg hover:opacity-80 transition-opacity"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--verdigris)] text-[var(--oxford-blue)]"
                  : "bg-[var(--space-cadet)] text-white hover:bg-[var(--yinmn-blue)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-effect p-6 rounded-lg">
          {activeTab === "hero" && <HeroEditor />}
          {activeTab === "about" && <AboutEditor />}
          {activeTab === "experiences" && <ExperiencesEditor />}
          {activeTab === "projects" && <ProjectsEditor />}
        </div>
      </div>
    </div>
  )
}

function HeroEditor() {
  const [subtitles, setSubtitles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const loadSubtitles = async () => {
      setLoading(true)
      const fetched = await getHeroSubtitles()
      setSubtitles(fetched)
      setLoading(false)
    }
    loadSubtitles()
  }, [])

  const addSubtitle = () => {
    setSubtitles([...subtitles, ""])
  }

  const updateSubtitle = (index: number, value: string) => {
    const updated = [...subtitles]
    updated[index] = value
    setSubtitles(updated)
  }

  const removeSubtitle = (index: number) => {
    setSubtitles(subtitles.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    const result = await saveHeroSubtitles(subtitles)
    if (result.success) {
      setMessage({ type: "success", text: result.message })
    } else {
      setMessage({ type: "error", text: result.message })
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="text-white">Loading Hero Section data...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--fluorescent-cyan)]">Hero Section Editor</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">Rotating Subtitles</label>
          {subtitles.map((subtitle, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={subtitle}
                onChange={(e) => updateSubtitle(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
                placeholder="Enter subtitle"
              />
              <button
                onClick={() => removeSubtitle(index)}
                className="px-3 py-2 bg-[var(--red-crayola)] text-white rounded hover:opacity-80"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addSubtitle}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--verdigris)] text-[var(--oxford-blue)] rounded hover:opacity-80"
          >
            <Plus size={16} />
            Add Subtitle
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
            {message.text}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--fluorescent-cyan)] text-[var(--oxford-blue)] rounded font-semibold disabled:opacity-50"
        >
          {saving ? (
            "Saving..."
          ) : (
            <>
              <Save size={16} /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function AboutEditor() {
  const [description, setDescription] = useState("")
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [existingProfileImageUrl, setExistingProfileImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const loadAboutContent = async () => {
      setLoading(true)
      const content = await getAboutContent()
      if (content) {
        setDescription(content.description)
        setExistingProfileImageUrl(content.profile_image_url)
      } else {
        // Fallback if no content found in DB
        setDescription(
          "I'm a web developer with a strong interest in user interface design, front-end architecture, and digital project management. I've built a variety of websites—from landing pages and e-commerce platforms to internal company systems—focusing on clean, responsive code and a smooth user experience.",
        )
        setExistingProfileImageUrl("/placeholder.svg?height=200&width=200")
      }
      setLoading(false)
    }
    loadAboutContent()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0])
    } else {
      setProfileImageFile(null)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    const formData = new FormData()
    formData.append("description", description)
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile)
    } else if (existingProfileImageUrl) {
      formData.append("existingProfileImageUrl", existingProfileImageUrl)
    }

    const result = await saveAboutContent(formData)
    if (result.success) {
      setMessage({ type: "success", text: result.message })
      // Optionally, re-fetch content to update the displayed image URL
      const updatedContent = await getAboutContent()
      if (updatedContent) {
        setExistingProfileImageUrl(updatedContent.profile_image_url)
      }
      setProfileImageFile(null) // Clear selected file after successful upload
    } else {
      setMessage({ type: "error", text: result.message })
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="text-white">Loading About Section data...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--fluorescent-cyan)]">About Section Editor</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
          />
          {existingProfileImageUrl && !profileImageFile && (
            <div className="mt-2 text-sm text-gray-400">
              Current image:{" "}
              <a
                href={existingProfileImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--verdigris)] hover:underline"
              >
                View
              </a>
            </div>
          )}
          {profileImageFile && (
            <div className="mt-2 text-sm text-gray-400">New image selected: {profileImageFile.name}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white resize-none"
          />
        </div>

        {message && (
          <div className={`p-3 rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
            {message.text}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--fluorescent-cyan)] text-[var(--oxford-blue)] rounded font-semibold disabled:opacity-50"
        >
          {saving ? (
            "Saving..."
          ) : (
            <>
              <Save size={16} /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ExperiencesEditor() {
  const [experiences, setExperiences] = useState<
    { id?: string; title: string; date_range: string; description: string; badges: string }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const loadExperiences = async () => {
      setLoading(true)
      const fetched = await getExperiences()
      // Convert badges array to comma-separated string for input field
      setExperiences(
        fetched.map((exp) => ({
          ...exp,
          badges: exp.badges.join(", "),
        })),
      )
      setLoading(false)
    }
    loadExperiences()
  }, [])

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        date_range: "",
        description: "",
        badges: "", // Empty string for new input
      },
    ])
  }

  const updateExperience = (index: number, field: keyof ExperienceData, value: string) => {
    const updated = [...experiences]
    // @ts-ignore - Type conversion for badges string to string[] will happen on save
    updated[index][field] = value
    setExperiences(updated)
  }

  const removeExperience = async (id?: string, index?: number) => {
    if (id) {
      setSaving(true)
      setMessage(null)
      const result = await deleteExperience(id)
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        setExperiences(experiences.filter((exp) => exp.id !== id))
      } else {
        setMessage({ type: "error", text: result.message })
      }
      setSaving(false)
    } else if (index !== undefined) {
      // If it's a new unsaved experience, just remove from state
      setExperiences(experiences.filter((_, i) => i !== index))
    }
  }

  const handleSave = async (index: number) => {
    setSaving(true)
    setMessage(null)
    const expToSave = experiences[index]
    const experienceData = {
      id: expToSave.id,
      title: expToSave.title,
      date_range: expToSave.date_range,
      description: expToSave.description,
      badges: expToSave.badges.split(",").map((s) => s.trim()), // Convert back to array
    }

    const result = await saveExperience(experienceData)
    if (result.success) {
      setMessage({ type: "success", text: result.message })
      // Re-fetch to get the ID for newly added items
      const updatedExperiences = await getExperiences()
      setExperiences(updatedExperiences.map((exp) => ({ ...exp, badges: exp.badges.join(", ") })))
    } else {
      setMessage({ type: "error", text: result.message })
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="text-white">Loading Experiences data...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--fluorescent-cyan)]">Experiences Editor</h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id || `new-${index}`} className="border border-[var(--verdigris)] p-4 rounded">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(index, "title", e.target.value)}
                className="px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
              />
              <input
                type="text"
                placeholder="Date Range"
                value={exp.date_range}
                onChange={(e) => updateExperience(index, "date_range", e.target.value)}
                className="px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
              />
            </div>
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => updateExperience(index, "description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white resize-none mb-4"
            />
            <input
              type="text"
              placeholder="Technologies (comma separated)"
              value={exp.badges}
              onChange={(e) => updateExperience(index, "badges", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => removeExperience(exp.id, index)}
                className="flex items-center gap-1 px-3 py-2 bg-[var(--red-crayola)] text-white rounded hover:opacity-80"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={() => handleSave(index)}
                disabled={saving}
                className="flex items-center gap-1 px-3 py-2 bg-[var(--fluorescent-cyan)] text-[var(--oxford-blue)] rounded font-semibold disabled:opacity-50"
              >
                <Save size={16} /> {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-2 bg-[var(--verdigris)] text-[var(--oxford-blue)] rounded hover:opacity-80"
        >
          <Plus size={16} />
          Add Experience
        </button>

        {message && (
          <div className={`p-3 rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectsEditor() {
  const [projects, setProjects] = useState([
    {
      name: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment integration.",
      image: "",
      technologies: ["React", "Node.js", "MongoDB"],
    },
  ])

  const addProject = () => {
    setProjects([
      ...projects,
      {
        name: "",
        description: "",
        image: "",
        technologies: [],
      },
    ])
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--fluorescent-cyan)]">Projects Editor</h2>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border border-[var(--verdigris)] p-4 rounded">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => {
                  const updated = [...projects]
                  updated[index].name = e.target.value
                  setProjects(updated)
                }}
                className="px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
              />
              <input
                type="file"
                accept="image/*"
                className="px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
              />
            </div>
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => {
                const updated = [...projects]
                updated[index].description = e.target.value
                setProjects(updated)
              }}
              rows={3}
              className="w-full px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white resize-none mb-4"
            />
            <input
              type="text"
              placeholder="Technologies (comma separated)"
              value={project.technologies.join(", ")}
              onChange={(e) => {
                const updated = [...projects]
                updated[index].technologies = e.target.value.split(",").map((s) => s.trim())
                setProjects(updated)
              }}
              className="w-full px-3 py-2 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded text-white"
            />
          </div>
        ))}

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 bg-[var(--verdigris)] text-[var(--oxford-blue)] rounded hover:opacity-80"
        >
          <Plus size={16} />
          Add Project
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--fluorescent-cyan)] text-[var(--oxford-blue)] rounded font-semibold">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  )
}
