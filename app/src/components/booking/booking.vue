<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/composables/useSupabase.js'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

// State
const serviceType = ref('')
const details = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

onMounted(() => {
  // Get the service name from the URL (e.g., /booking?service=Dry+Cleaning)
  if (route.query.service) {
    serviceType.value = route.query.service
  } else {
    // If no service in URL, redirect back to services
    router.push('/adventures')
  }
})

const handleInquiry = async () => {
  // 1. Check if user is logged in
  if (!auth.user) {
    alert("You must be logged in to make an inquiry.")
    router.push('/login')
    return
  }

  isSubmitting.value = true
  errorMessage.value = ""

  try {
    // 2. Insert into Supabase 'inquiries' table
    const { error } = await supabase
      .from('inquiries')
      .insert([
        {
          client_id: auth.user.id,
          service_type: serviceType.value,
          details: details.value,
          status: 'pending' // Default status
        }
      ])

    if (error) throw error

    // 3. Success! Redirect to Client Dashboard to see the inquiry
    alert("Inquiry sent successfully! You can track it on your dashboard.")
    router.push('/dashboard')

  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-black text-gray-900 tracking-tight">Complete Your Inquiry</h2>
      <p class="text-gray-500 mt-2">Tell us more about your laundry needs.</p>
    </div>

    <div class="space-y-6">
      <!-- Selected Service (Disabled Input) -->
      <div>
        <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Selected Service</label>
        <input 
          v-model="serviceType" 
          disabled 
          class="w-full bg-blue-50 border-2 border-blue-100 text-blue-700 font-bold py-3 px-4 rounded-xl cursor-not-allowed"
        />
      </div>

      <!-- Additional Details -->
      <div>
        <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Special Instructions</label>
        <textarea 
          v-model="details" 
          rows="4"
          placeholder="e.g. Please use delicate detergent for the silk shirts..."
          class="w-full border-2 border-gray-100 focus:border-blue-500 focus:ring-0 rounded-xl p-4 transition duration-200"
        ></textarea>
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">
        {{ errorMessage }}
      </p>

      <!-- Submit Button -->
      <button 
        @click="handleInquiry"
        :disabled="isSubmitting"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isSubmitting">Send Inquiry Now</span>
        <span v-else>Sending...</span>
      </button>

      <!-- Back Link -->
      <div class="text-center mt-4">
        <router-link to="/adventures" class="text-gray-400 hover:text-gray-600 text-sm font-medium">
          ← Choose a different service
        </router-link>
      </div>
    </div>
  </div>
</template>