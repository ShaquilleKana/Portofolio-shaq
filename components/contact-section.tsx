"use client"

import type React from "react"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Web3Forms integration will be handled here
    // User can add their access key
    console.log("Form submitted:", formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-4 bg-[#1c2541]">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#6fffe9]">
            Interested in working together or exploring new ideas?
          </h2>
          <p className="text-lg text-white">
            Feel free to get in touch. I'm open to discussions, collaborations, and new career opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-lg">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#6fffe9]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-[#5bc0be] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fffe9] text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#6fffe9]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-[#5bc0be] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fffe9] text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#6fffe9]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white border border-[#5bc0be] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fffe9] text-gray-900 resize-none placeholder-gray-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-[#5bc0be] text-[#0b132b] font-semibold rounded-lg hover:bg-[#6fffe9] hover:shadow-lg hover:shadow-[#5bc0be]/30 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
