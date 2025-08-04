import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Create a single Supabase client for the client-side
// using the singleton pattern to prevent multiple instances.
let supabase: ReturnType<typeof createSupabaseClient> | undefined

export function createClient() {
  if (!supabase) {
    // Using createClient instead of createBrowserClient as a workaround for the export error.
    // For browser environments, createBrowserClient is generally preferred,
    // but createClient should also work for basic operations.
    supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }
  return supabase
}
