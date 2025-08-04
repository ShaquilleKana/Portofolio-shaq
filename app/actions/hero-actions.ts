"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveHeroSubtitles(subtitles: string[]) {
  const supabase = createServerSupabaseClient()

  try {
    // Clear existing subtitles
    const { error: deleteError } = await supabase
      .from("hero_subtitles")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000") // Delete all rows

    if (deleteError) {
      console.error("Error deleting old subtitles:", deleteError)
      return { success: false, message: "Failed to clear old subtitles." }
    }

    // Insert new subtitles with order_index
    const subtitlesToInsert = subtitles.map((subtitle, index) => ({
      subtitle,
      order_index: index,
    }))

    const { error: insertError } = await supabase.from("hero_subtitles").insert(subtitlesToInsert)

    if (insertError) {
      console.error("Error inserting new subtitles:", insertError)
      return { success: false, message: "Failed to save new subtitles." }
    }

    revalidatePath("/") // Revalidate the home page to show updated subtitles
    return { success: true, message: "Hero subtitles saved successfully!" }
  } catch (error) {
    console.error("Unexpected error saving hero subtitles:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}

export async function getHeroSubtitles() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("hero_subtitles")
    .select("subtitle")
    .order("order_index", { ascending: true })

  if (error) {
    console.error("Error fetching hero subtitles for admin:", error)
    return []
  }
  return data.map((item) => item.subtitle)
}
