import type { AxiosError } from 'axios'
import { useModalStore } from '@/stores/modal'

export const handleAxiosError = (err: unknown): { message: string; code?: number } => {
  const modalStore = useModalStore()
  const error = err as AxiosError<{ message?: string }>
  const message = error.response?.data?.message || error.message || 'Unknown error'
  const code = error.response?.status

  modalStore.openErrorModal({ message, code })

  return { message, code }
}
