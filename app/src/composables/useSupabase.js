import { createClient } from '@supabase/supabase-js'

// 1. Your Project URL
const supabaseUrl = 'https://kfwptjkldrtjxslrhxzk.supabase.co' 

// 2. Your Anon/Publishable Key
const supabaseAnonKey = 'sb_publishable_6l1FJnYXOvFun79mzpUpIw_tFX64xhT'

// Create and export the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)