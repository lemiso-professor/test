<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/composables/useSupabase.js'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const myInquiries = ref([])

const fetchMyInquiries = async () => {
  const { data } = await supabase
    .from('inquiries')
    .select('*')
    .eq('client_id', auth.user.id)
    .order('created_at', { ascending: false })
  myInquiries.value = data
}

onMounted(() => {
  fetchMyInquiries()

  // REALTIME: Listen for when the admin updates the status
  supabase
    .channel('client-room')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'inquiries' }, () => {
      fetchMyInquiries() // Refresh list automatically
    })
    .subscribe()
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">My Laundry Status</h1>
    <div v-for="i in myInquiries" :key="i.id" class="p-4 border-b flex justify-between">
      <div>
        <p class="font-bold">{{ i.service_type }}</p>
        <p class="text-sm text-gray-500">{{ new Date(i.created_at).toLocaleDateString() }}</p>
      </div>
      <span class="px-3 py-1 rounded bg-yellow-100 text-yellow-800">{{ i.status }}</span>
    </div>
  </div>
</template>