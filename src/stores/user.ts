import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const isAuthorized = ref(false)
  // const userEmail = ref('')
  const userName = ref('')
  // const userSurname = ref('')
  const token = ref(localStorage.getItem('authToken'))

  if (token.value) {
    isAuthorized.value = true
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('authToken', newToken)
    isAuthorized.value = true

    // Устанавливаем токен для всех будущих запросов
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  // const clearToken = () => {
  //   token.value = null
  //   isAuthorized.value = false
  //   localStorage.removeItem('authToken')
  //   delete api.defaults.headers.common['Authorization']
  // }

  return {
    isAuthorized,
    token: computed(() => token.value),
    setToken,
    // userEmail,
    userName,
    // userSurname,
  }
})
