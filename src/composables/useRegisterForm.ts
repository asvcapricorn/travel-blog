import { ref, type Ref } from 'vue'
import api from '@/services/api'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
}

interface ValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

interface UseRegisterFormReturn {
  form: Ref<RegisterForm>
  errors: Ref<ValidationErrors>
  formError: Ref<string>
  isLoading: Ref<boolean>
  handleSubmit: () => Promise<void>
  clearErrors: () => void
}

export function useRegisterForm(): UseRegisterFormReturn {
  const router = useRouter()

  const form = ref<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: '',
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
      if (form.value.password === form.value.confirmPassword) {
        await api.post('/register', {
          email: form.value.email,
          password: form.value.password,
        })
        router.push('/login')
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
  }
}
