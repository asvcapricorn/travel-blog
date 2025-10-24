<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import CommonIcon from '@/components/common/CommonIcon.vue'

defineProps<{
  homePage?: boolean;
}>();

const userStore = useUserStore()
const { userName } = storeToRefs(userStore)

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    userName.value = JSON.parse(userData).name
  }
})

</script>

<template>
  <header class="header" :class="{ 'header--home-page': homePage }">
    <picture class="header__bg-picture">
      <img class="header__bg-image" src="@/assets/images/hero.jpg" srcset="@/assets/images/hero@2x.jpg 2x" height="422"
        width="1920" alt="Фоновое изображение" loading="lazy" />
    </picture>
    <div class="container">
      <div class="header__wrapper">
        <div class="header__top">
          <RouterLink class="header__logo" to="/">
            <CommonIcon iconName="IconLogo" fill="white" stroke="white" />
          </RouterLink>
          <div class="header__right">
            <RouterLink class="header__profile" to="/profile" v-if="userName">
              {{ userName }}
            </RouterLink>
            <RouterLink class="header__profile" to="/login" v-else>
              Войти
            </RouterLink>
          </div>
        </div>
        <h1 v-if="homePage" class="header__title">Там, где мир начинается с путешествий</h1>
        <h1 v-else class="header__title">Истории ваших путешествий</h1>
      </div>
    </div>
  </header>
</template>
