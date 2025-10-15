import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

interface ErrorContent {
  message: string
  code?: number
}

export const useModalStore = defineStore('modal', () => {
  const body = document.body

  const authModal = ref(false)
  const registrationModal = ref(false)
  const successModal = ref(false)
  const errorModal = ref(false)
  const trailerModal = ref(false)

  const isBodyScrollLocked = ref(false)
  const trailerUrl = ref('')
  const scrollbarWidth = ref(0)

  const errContent = ref<ErrorContent | null>(null)

  const openAuthModal = () => {
    authModal.value = true
    registrationModal.value = false
    successModal.value = false
    errorModal.value = false
    lockBodyScroll()
  }

  const openRegistrationModal = () => {
    registrationModal.value = true
    authModal.value = false
    successModal.value = false
    errorModal.value = false
    lockBodyScroll()
  }

  const openSuccessModal = () => {
    successModal.value = true
    authModal.value = false
    registrationModal.value = false
    errorModal.value = false
    lockBodyScroll()
  }

  const openErrorModal = (err: ErrorContent) => {
    errorModal.value = true
    errContent.value = err
    authModal.value = false
    registrationModal.value = false
    successModal.value = false
    lockBodyScroll()
  }

  const openTrailerModal = () => {
    trailerModal.value = true
    errorModal.value = false
    lockBodyScroll()
  }

  const lockBodyScroll = () => {
    if (!isBodyScrollLocked.value) {
      scrollbarWidth.value = window.innerWidth - document.documentElement.clientWidth
      body.style.paddingRight = `${scrollbarWidth.value}px`
      body.classList.add('body-no-scroll')
      isBodyScrollLocked.value = true
    }
  }

  const unlockBodyScroll = () => {
    if (
      isBodyScrollLocked.value &&
      !authModal.value &&
      !registrationModal.value &&
      !successModal.value &&
      !errorModal.value &&
      !trailerModal.value
    ) {
      body.classList.remove('body-no-scroll')
      body.style.paddingRight = ''
      isBodyScrollLocked.value = false
    }
  }

  watch([authModal, registrationModal, successModal, errorModal, trailerModal], () => {
    unlockBodyScroll()
  })

  return {
    authModal,
    registrationModal,
    successModal,
    errorModal,
    trailerModal,
    trailerUrl,
    openAuthModal,
    openRegistrationModal,
    openSuccessModal,
    openErrorModal,
    openTrailerModal,
    errContent,
  }
})
