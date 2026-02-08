<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/composables/useSupabase.js'

const allInquiries = ref([])

const fetchAll = async () => {
  // We join with profiles to see the client's email
  const { data } = await supabase
    .from('inquiries')
    .select('*, profiles(email)')
    .order('created_at', { ascending: false })
  allInquiries.value = data
}

const updateStatus = async (id, newStatus) => {
  await supabase.from('inquiries').update({ status: newStatus }).eq('id', id)
  fetchAll()
}

onMounted(() => {
  fetchAll()
  
  // Realtime: See new inquiries as they come in
  supabase.channel('admin-room')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inquiries' }, () => fetchAll())
    .subscribe()
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Admin: All Incoming Inquiries</h1>
    <table class="w-full bg-white border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2">Client</th>
          <th class="p-2">Service</th>
          <th class="p-2">Status</th>
          <th class="p-2">Update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in allInquiries" :key="item.id" class="border-t text-center">
          <td class="p-2">{{ item.profiles?.email }}</td>
          <td class="p-2">{{ item.service_type }}</td>
          <td class="p-2 font-bold">{{ item.status }}</td>
          <td class="p-2">
            <select @change="(e) => updateStatus(item.id, e.target.value)" class="border p-1">
              <option value="pending">Pending</option>
              <option value="in-progress">Washing</option>
              <option value="completed">Ready</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>