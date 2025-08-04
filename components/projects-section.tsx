"use client"

import { useState } from "react"

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: 2,
      name: "Data Analytics Dashboard",
      description: "Interactive dashboard for visualizing business metrics and KPIs with real-time data updates.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    },
    {
      id: 3,
      name: "Task Management App",
      description: "Collaborative task management application with team features, notifications, and project tracking.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    },
  ]

  const [selectedProject, setSelectedProject] = useState(projects[0])

  return (
    <section id="projects" className="py-20 px-4 bg-[#1c2541]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#6fffe9]">Projects</h2>

        {/* Featured Project */}
        <div className="mb-12">
          <div className="glass-effect rounded-lg overflow-hidden">
            <img
              src={selectedProject.image || "/placeholder.svg"}
              alt={selectedProject.name}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-[#6fffe9]">{selectedProject.name}</h3>
              <p className="text-white mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="badge px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card glass-effect p-4 rounded-lg cursor-pointer transition-all ${
                selectedProject.id === project.id ? "ring-2 ring-[var(--verdigris)]" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h4 className="font-semibold mb-2 text-[#6fffe9]">{project.name}</h4>
              <p className="text-sm text-white mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="badge px-2 py-1 rounded text-xs">
                    {tech}
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
