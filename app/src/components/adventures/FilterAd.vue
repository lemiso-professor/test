<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const services = [
  { id: 1, name: 'Wash & Fold', price: '$10' },
  { id: 2, name: 'Dry Cleaning', price: '$20' }
]

const selectService = (serviceName) => {
  // Redirect to booking page with the service name as a query parameter
  router.push({ name: 'Booking', query: { service: serviceName } })
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="s in services" :key="s.id" class="border p-4 rounded shadow">
      <h3>{{ s.name }}</h3>
      <button @click="selectService(s.name)" class="bg-blue-500 text-white p-2 mt-2">
        Inquire Now
      </button>
    </div>
  </div>
</template>