import { ref, type Ref } from 'vue'
import api from '@/services/api'
import { AxiosError } from 'axios'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

interface ProfileForm {
  name: string
  country: string
  city: string
  bio: string
  password: string
  confirmPassword: string
  photo: string
}

interface ValidationErrors {
  password?: string
  confirmPassword?: string
}

interface UseProfileFormReturn {
  form: Ref<ProfileForm>
  errors: Ref<ValidationErrors>
  formError: Ref<string>
  isLoading: Ref<boolean>
  handleSubmit: () => Promise<void>
  clearErrors: () => void
  finishEditingProfile: Ref<boolean>
}

export function useProfileForm(): UseProfileFormReturn {
  const form = ref<ProfileForm>({
    name: 'Пользователь',
    country: 'Не указана',
    city: 'Не указан',
    bio: 'Информация отсутствует',
    password: '',
    confirmPassword: '',
    photo: '',
  })

  const errors = ref<ValidationErrors>({})
  const formError = ref('')
  const isLoading = ref(false)
  const finishEditingProfile = ref(false)

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
      if (form.value.password === form.value.confirmPassword) {
        const resp1 = await api.post('/user', {
          full_name: form.value.name,
          country: form.value.country,
          city: form.value.city,
          bio: form.value.bio,
        })
        const data1 = await resp1.data
        console.log('data1', data1)

        if (form.value.password) {
          const resp2 = await api.patch('/user/password', {
            password: form.value.password,
          })
          const data2 = await resp2.data
          console.log('data2', data2)
        }

        try {
          const resp = await api.get('/user')
          const data = await resp.data
          console.log('user', data)
          userStore.setUser(data)
          localStorage.setItem('user', JSON.stringify(data))
          console.log('localStorage.getItem', localStorage.getItem('user'))
        } catch (err) {
          // handleAxiosError(err)
          console.log('await api.get(/user) err', err)
        }

        finishEditingProfile.value = true
      } else {
        throw new Error('Passwords should be the same')
      }
    } catch (err) {
      if (err instanceof Error && err.message && err.message === 'Passwords should be the same') {
        setFieldError('confirmPassword', err.message)
      } else if (err instanceof AxiosError && err.response) {
        const { status, data } = err.response
        if (status === 400 && data.messages) {
          Object.keys(data.messages).forEach((field) => {
            if (field in form.value && data.messages[field] && data.messages[field].length > 0) {
              setFieldError(field as keyof ValidationErrors, data.messages[field][0])
            }
          })
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
    clearErrors,
    finishEditingProfile,
  }
}
