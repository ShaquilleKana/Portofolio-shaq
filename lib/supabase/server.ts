import { createClient as createServerClient } from "@supabase/supabase-js"

// Create a Supabase client for server-side operations (Server Actions, Route Handlers)
export function createServerSupabaseClient() {
  // When using the service_role key, we typically do NOT pass user cookies,
  // as the service_role key is meant to bypass RLS regardless of the logged-in user.
  // Passing cookies might cause the client to use the user's session instead of the service_role.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for server-side
    // Removed the 'cookies' option to ensure the service_role key is used exclusively for RLS bypass.
  )
}
