"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface ExperienceData {
  id?: string // Optional for new experiences
  title: string
  date_range: string
  description: string
  badges: string[]
}

export async function getExperiences() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("experiences").select("*").order("date_range", { ascending: false })

  if (error) {
    console.error("Error fetching experiences for admin:", error)
    return []
  }
  return data as ExperienceData[]
}

export async function saveExperience(experience: ExperienceData) {
  const supabase = createServerSupabaseClient()
  // Log the presence of the service role key for debugging
  console.log("SUPABASE_SERVICE_ROLE_KEY is present:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

  try {
    if (experience.id) {
      // Update existing experience
      const { error } = await supabase
        .from("experiences")
        .update({
          title: experience.title,
          date_range: experience.date_range,
          description: experience.description,
          badges: experience.badges,
        })
        .eq("id", experience.id)
        .single()

      if (error) {
        console.error("Error updating experience:", error)
        return { success: false, message: "Failed to update experience." }
      }
    } else {
      // Insert new experience
      const { error } = await supabase.from("experiences").insert({
        title: experience.title,
        date_range: experience.date_range,
        description: experience.description,
        badges: experience.badges,
      })

      if (error) {
        console.error("Error inserting experience:", error)
        return { success: false, message: "Failed to add experience." }
      }
    }

    revalidatePath("/experiences") // Revalidate the experiences page
    revalidatePath("/") // Revalidate the home page if it also shows experiences
    return { success: true, message: "Experience saved successfully!" }
  } catch (error) {
    console.error("Unexpected error saving experience:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}

export async function deleteExperience(id: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { error } = await supabase.from("experiences").delete().eq("id", id)

    if (error) {
      console.error("Error deleting experience:", error)
      return { success: false, message: "Failed to delete experience." }
    }

    revalidatePath("/experiences")
    revalidatePath("/")
    return { success: true, message: "Experience deleted successfully!" }
  } catch (error) {
    console.error("Unexpected error deleting experience:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
