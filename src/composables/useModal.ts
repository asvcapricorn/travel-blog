import { computed, onMounted, onUnmounted } from 'vue'

export function useModal(
  props: { modelValue: boolean },
  emit: (event: 'update:modelValue', value: boolean) => void,
) {
  const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  const close = () => {
    isOpen.value = false
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  return {
    isOpen,
    close,
  }
}
