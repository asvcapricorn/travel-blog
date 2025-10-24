import { ref } from 'vue'
import JustValidate from 'just-validate'
import api from '@/services/api'
import type { IFields } from '@/types/validationFields'
import { useModalStore } from '@/stores/modal'
import { handleAxiosError } from '@/utils'

export function useRegistrationForm(closeModal: () => void) {
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const name = ref('')
  const surname = ref('')

  const validator = ref<typeof JustValidate | null>(null)

  const modalStore = useModalStore()

  const openSuccess = () => {
    closeModal()
    modalStore.openSuccessModal()
  }

  const handleSubmit = async () => {
    const formEl = document.querySelector('.form')
    try {
      await api.post('/user', {
        email: email.value,
        password: password.value,
        name: name.value,
        surname: surname.value,
      })
      openSuccess()
      formEl?.classList.remove('form--error')
    } catch (err) {
      handleAxiosError(err)
    }
  }

  const clearErrorClasses = () => {
    document.querySelectorAll('.custom-input--error').forEach((el) => {
      el.classList.remove('custom-input--error')
    })
  }

  const initValidator = (formSelector: string) => {
    validator.value = new JustValidate(formSelector, {
      validateBeforeSubmitting: true,
    })

    validator.value
      .addField('#email', [{ rule: 'email' }, { rule: 'required' }], {
        errorsContainer: '#email + .custom-input__error',
      })
      .addField(
        '#password',
        [
          { rule: 'password', errorMessage: 'Minimum eight characters, one letter and one number' },
          { rule: 'required' },
        ],
        {
          errorsContainer: '#password + .custom-input__error',
        },
      )
      .addField('#name', [{ rule: 'required' }], {
        errorsContainer: '#name + .custom-input__error',
      })
      .addField('#surname', [{ rule: 'required' }], {
        errorsContainer: '#surname + .custom-input__error',
      })
      .addField(
        '#confirmPassword',
        [
          {
            validator: (value: string, fields: IFields) => {
              if (fields['#password'] && fields['#password'].elem) {
                const passwordValue = fields['#password'].elem.value
                return value === passwordValue
              }
              return true
            },
            errorMessage: 'Passwords should be the same',
          },
        ],
        {
          errorsContainer: '#confirmPassword + .custom-input__error',
        },
      )
      .onValidate(() => {
        clearErrorClasses()
      })
      .onSuccess(() => {
        clearErrorClasses()
        handleSubmit()
      })
      .onFail((fields: IFields) => {
        for (const key in fields) {
          const field = fields[key]
          field.elem
            .closest('.custom-input')
            ?.classList.toggle('custom-input--error', !field.isValid)
        }
      })
  }

  const destroyValidator = () => {
    validator.value?.destroy()
  }

  return {
    email,
    name,
    surname,
    password,
    confirmPassword,
    initValidator,
    destroyValidator,
  }
}
