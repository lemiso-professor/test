import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/composables/useSupabase.js'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)

  const initializeAuth = () => {
    supabase.auth.onAuthStateChanged(async (event, session) => {
      user.value = session?.user || null
      if (user.value) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
        profile.value = data
      } else {
        profile.value = null
      }
    })
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    
    const { data: p } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
    profile.value = p
    user.value = data.user
    
    // Redirect to the single DashboardView (which handles role logic inside)
    router.push('/dashboard')
  }

  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    if (data.user) {
        await supabase.from('profiles').insert([{ id: data.user.id, email, role: 'client' }])
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return { user, profile, login, register, logout, initializeAuth }
})