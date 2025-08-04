"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin-login"
import AdminDashboard from "@/components/admin-dashboard"
import { createClient } from "@/lib/supabase/client"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // Make the useEffect callback async
      const supabase = createClient()
      const { data } = await supabase.auth.getSession() // Await the call to get the data object

      if (data?.session) {
        // Safely check if data and session exist
        setIsAuthenticated(true)
      }
      setIsLoading(false)

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session)
        setIsLoading(false)
      })

      return () => {
        authListener?.unsubscribe()
      }
    }

    checkAuth() // Call the async function
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c2541]">
        <div className="text-[var(--fluorescent-cyan)]">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
}
