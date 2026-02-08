<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/common/Header.vue'
import AppFooter from '@/components/common/Footer.vue'

const auth = useAuthStore()

onMounted(() => {
  auth.initializeAuth()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-grow">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>