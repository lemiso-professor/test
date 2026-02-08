<template>
  <div class="min-h-screen bg-slate-50 p-8 pt-24">
    <div class="max-w-7xl mx-auto">
      <!-- Logic based on the role stored in Pinia -->
      <AdminView v-if="authStore.profile?.role === 'admin'" />
      <ClientView v-else-if="authStore.profile?.role === 'client'" />
      
      <div v-else class="text-center py-20">
        <p>Loading profile...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import AdminView from '@/components/auth/dashboard/AdminView.vue'
import ClientView from '@/components/auth/dashboard/ClientView.vue'

const authStore = useAuthStore()
</script>