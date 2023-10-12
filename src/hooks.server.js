import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, error } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  })

 
  // * a little helper that is written for convenience so that instead
   //* of calling `const { data: { session } } = await supabase.auth.getSession()`
 //  * you just call this `await getSession()`
   
  event.locals.getSession = async () => {
    
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
     if (event.url.pathname.startsWith('/api/posts')) {
        const session = await event.locals.getSession()
        if (!session) {
          throw redirect(303, '/')
        }}
    
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}