<script setup lang="ts">
import CommonIcon from '@/components/common/CommonIcon.vue';
// import api from '@/services/api'
// import { useUserStore } from '@/stores/user'
// import { storeToRefs } from 'pinia'
// import { handleAxiosError } from '@/utils'

// const userStore = useUserStore()
// const { isAuthorized, user } = storeToRefs(userStore)

const userData = localStorage.getItem('user')
// let user: string = ''
let nameString: string = ''
let cityString: string = ''
let bioString: string = ''
let photoString: string = ''

if (userData) {
  try {
    const parsedUser = JSON.parse(userData);
    nameString = parsedUser.full_name || '';
    cityString = parsedUser.city || '';
    bioString = parsedUser.bio || '';
    photoString = parsedUser.bio || '';
  } catch (err) {
    console.log(err);
    // handleAxiosError(err)
  }
}

// const getInitials = (): string => {
//   const firstCharName = nameString.charAt(0) || ''
//   const firstCharSurname = surnameString.charAt(0) || ''

//   return (firstCharName + firstCharSurname).toUpperCase()
// }

// const logout = async (): Promise<void> => {
//   try {
//     await api.get('/auth/logout')
//     isAuthorized.value = false
//     userEmail.value = ''
//     userName.value = ''
//     userSurname.value = ''

//     localStorage.removeItem('user')
//   } catch (err) {
//     // handleAxiosError(err)
//   }
// }
</script>

<template>
  <main>
    <section class="profile">
      <div class="container">
        <div class="profile__wrapper">
          <div class="profile__img-container">
            <img class="profile__image" :src="`https://travelblog.skillbox.cc${photoString}`" height="240" width="240"
              alt="Фото истории" v-if="photoString" />
            <CommonIcon class="profile__image" iconName="IconUserDefault" v-else />
          </div>
          <div class="profile__content">
            <h2 class="profile__name">{{ nameString }}</h2>
            <span class="profile__item">Город:</span>
            <span class="profile__city">{{ cityString }}</span>
            <span class="profile__item">О себе:</span>
            <span class="profile__bio">{{ bioString }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
