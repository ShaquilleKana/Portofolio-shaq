"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid" // For unique file names

export async function getAboutContent() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("about_content").select("*").single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 means "no rows found"
    console.error("Error fetching about content for admin:", error)
    return null
  }
  return data
}

export async function saveAboutContent(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const description = formData.get("description") as string
  const profileImageFile = formData.get("profileImage") as File | null

  let profileImageUrl: string | undefined

  // Handle image upload if a new file is provided
  if (profileImageFile && profileImageFile.size > 0) {
    const fileExtension = profileImageFile.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    const filePath = `profile_images/${fileName}` // Define a path in your Supabase Storage bucket

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-images") // Replace with your actual bucket name
      .upload(filePath, profileImageFile, {
        cacheControl: "3600",
        upsert: true,
      })

    if (uploadError) {
      console.error("Error uploading profile image:", uploadError)
      return { success: false, message: "Failed to upload profile image." }
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage.from("portfolio-images").getPublicUrl(filePath)
    profileImageUrl = publicUrlData.publicUrl
  } else {
    // If no new file, try to get existing image URL from form data
    profileImageUrl = formData.get("existingProfileImageUrl") as string | undefined
  }

  try {
    // Check if there's existing content
    const { data: existingContent, error: fetchError } = await supabase.from("about_content").select("id").single()

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking existing about content:", fetchError)
      return { success: false, message: "Failed to check existing content." }
    }

    if (existingContent) {
      // Update existing row
      const { error: updateError } = await supabase
        .from("about_content")
        .update({
          description: description,
          profile_image_url: profileImageUrl,
        })
        .eq("id", existingContent.id)
        .single()

      if (updateError) {
        console.error("Error updating about content:", updateError)
        return { success: false, message: "Failed to update about content." }
      }
    } else {
      // Insert new row if no content exists
      const { error: insertError } = await supabase.from("about_content").insert({
        description: description,
        profile_image_url: profileImageUrl,
      })

      if (insertError) {
        console.error("Error inserting about content:", insertError)
        return { success: false, message: "Failed to insert about content." }
      }
    }

    revalidatePath("/about") // Revalidate the about page
    revalidatePath("/") // Revalidate the home page if it also shows about content
    return { success: true, message: "About Section saved successfully!" }
  } catch (error) {
    console.error("Unexpected error saving about content:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
