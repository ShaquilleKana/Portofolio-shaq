"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface AdminLoginProps {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Clear previous errors

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      setError(error.message)
    } else {
      // Supabase's onAuthStateChange listener in app/admin/page.tsx will handle the state update
      // No need to call onLogin() directly here as the listener will trigger it.
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#1c2541]">
      <div className="glass-effect p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-[var(--fluorescent-cyan)]">Admin Login</h1>

        {error && <div className="bg-[var(--red-crayola)] text-white p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--fluorescent-cyan)] text-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--space-cadet)] border border-[var(--verdigris)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--fluorescent-cyan)] text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-[var(--verdigris)] text-[var(--oxford-blue)] font-semibold rounded-lg hover:bg-[var(--fluorescent-cyan)] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
