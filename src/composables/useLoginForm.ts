import { ref, type Ref } from 'vue'
import api from '@/services/api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'

interface LoginForm {
  email: string
  password: string
}

interface ValidationErrors {
  email?: string
  password?: string
}

interface UseLoginFormReturn {
  form: Ref<LoginForm>
  errors: Ref<ValidationErrors>
  formError: Ref<string>
  isLoading: Ref<boolean>
  handleSubmit: () => Promise<void>
}

export function useLoginForm(): UseLoginFormReturn {
  const router = useRouter()

  const userStore = useUserStore()
  const { isAuthorized } = storeToRefs(userStore)

  const form = ref<LoginForm>({
    email: '',
    password: '',
  })

  const errors = ref<ValidationErrors>({})
  const formError = ref('')
  const isLoading = ref(false)

  const clearErrors = (): void => {
    errors.value = {}
    formError.value = ''
  }

  const setFieldError = (field: keyof ValidationErrors, message: string): void => {
    errors.value[field] = message
  }

  const handleSubmit = async (): Promise<void> => {
    clearErrors()
    isLoading.value = true
    try {
      const resp = await api.post('/login', {
        email: form.value.email,
        password: form.value.password,
      })
      const data = await resp.data

      if (data.token) {
        userStore.setToken(data.token)
      }

      router.push('/')

      isAuthorized.value = true
      try {
        const resp = await api.get('/user')
        const data = await resp.data
        userStore.setUser(data)
        // localStorage.setItem('user', JSON.stringify(data))
      } catch (err) {
        // handleAxiosError(err)
        console.log(err)
      }
    } catch (err) {
      console.log(err)
      if (err instanceof AxiosError && err.response) {
        const { status, data } = err.response
        if (status === 400 && data.messages) {
          Object.keys(data.messages).forEach((field) => {
            if (field in form.value && data.messages[field] && data.messages[field].length > 0) {
              setFieldError(field as keyof ValidationErrors, data.messages[field][0])
            }
          })
        } else if (status === 401) {
          formError.value = 'Неправильный логин или пароль'
        } else {
          formError.value = 'Произошла непредвиденная ошибка'
        }
      } else {
        formError.value = 'Произошла непредвиденная ошибка'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    errors,
    formError,
    isLoading,
    handleSubmit,
  }
}
