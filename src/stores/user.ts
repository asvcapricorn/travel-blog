import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

interface UserData {
  bio?: string
  city?: string
  country?: string
  full_name?: string
  id?: string
  photo?: string
}

export const useUserStore = defineStore('user', () => {
  const isAuthorized = ref(false)
  const user = ref<UserData>({})

  const token = ref(localStorage.getItem('authToken'))

  if (token.value) {
    isAuthorized.value = true
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('authToken', newToken)
    isAuthorized.value = true

    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const clearToken = () => {
    token.value = null
    isAuthorized.value = false
    localStorage.removeItem('authToken')
    delete api.defaults.headers.common['Authorization']
  }

  const setUser = (userData: UserData) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = {}
  }

  const logout = () => {
    clearToken()
    clearUser()
  }

  return {
    isAuthorized,
    user,
    token,
    setToken,
    clearToken,
    setUser,
    clearUser,
    logout,
  }
})
