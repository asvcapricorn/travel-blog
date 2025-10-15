import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isAuthorized = ref(false)
  const userEmail = ref('')
  const userName = ref('')
  const userSurname = ref('')

  return {
    isAuthorized,
    userEmail,
    userName,
    userSurname,
  }
})
