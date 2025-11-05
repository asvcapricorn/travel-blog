<script setup lang="ts">
import { ref } from 'vue';
import { useProfileForm } from '@/composables/useProfileForm';
import CommonIcon from '@/components/common/CommonIcon.vue';

const { form, errors, formError, isLoading, handleSubmit, clearErrors } = useProfileForm();

const userData = localStorage.getItem('user')
let nameString: string = ''
let countryString: string = ''
let cityString: string = ''
let bioString: string = ''
let photoString: string = ''

if (userData) {
  try {
    const parsedUser = JSON.parse(userData);
    nameString = parsedUser.full_name || 'Пользователь';
    countryString = parsedUser.country || 'Не указана';
    cityString = parsedUser.city || 'Не указан';
    bioString = parsedUser.bio || 'Информация отсутствует';
    photoString = parsedUser.bio || '';
  } catch (err) {
    console.log(err);
    // handleAxiosError(err)
  }
}

const profileIsEditing = ref(false);
const toggleEditingProfile = (): void => {
  profileIsEditing.value = !profileIsEditing.value;
}

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
    <section class="profile" :class="{ 'profile--isEditing': profileIsEditing }">
      <div class="container">
        <div class="profile__wrapper">
          <div class="profile__img-wrapper">
            <div class="profile__img-container">
              <img class="profile__image" :src="`https://travelblog.skillbox.cc${photoString}`" height="240" width="240"
                alt="Фото истории" v-if="photoString" />
              <CommonIcon class="profile__image" iconName="IconUserDefault" v-else />
            </div>
            <button class="profile__edit-photo" type="button">
              <CommonIcon iconName="IconPhoto" />
              <span class="profile__edit-photo-text">Изменить фото</span>
            </button>
          </div>
          <div class="profile__info">
            <div class="profile__content">
              <div class="profile__title">
                <h2 class="profile__name">{{ nameString }}</h2>
                <button class="btn btn--icon profile__edit" type="button" @click="toggleEditingProfile">
                  <CommonIcon iconName="IconEdit" />
                </button>
              </div>
              <span class="profile__item">Город:</span>
              <span class="profile__country">{{ countryString }}</span>
              <span class="profile__city">{{ cityString }}</span>
              <span class="profile__item">О себе:</span>
              <p class="profile__bio">{{ bioString }}</p>
            </div>
            <form class="form profile-form" :class="{ 'form--error': !!formError }" @submit.prevent="handleSubmit"
              novalidate>
              <fieldset class="form__group">
                <span class="form__error">{{ formError }}</span>
                <div class="custom-input form__group-item form__group-item--two-cols">
                  <label class="custom-input__label" for="name">
                    <span class="custom-input__label-text">ФИО</span>
                  </label>
                  <input class="custom-input__field" name="name" id="name" type="text" placeholder="ФИО"
                    v-model="form.name">
                </div>
                <div class="custom-input form__group-item form__group-item--two-cols">
                  <label class="custom-input__label" for="country">
                    <span class="custom-input__label-text">Страна</span>
                  </label>
                  <input class="custom-input__field" name="country" id="country" type="text" placeholder="Страна"
                    v-model="form.country">
                </div>
                <div class="custom-input form__group-item form__group-item--two-cols">
                  <label class="custom-input__label" for="city">
                    <span class="custom-input__label-text">Город</span>
                  </label>
                  <input class="custom-input__field" name="city" id="city" type="text" placeholder="Город"
                    v-model="form.city">
                </div>
                <div class="custom-textarea form__group-item form__group-item--two-cols"
                  :class="{ 'custom-textarea--error': !!errors.bio }">
                  <label class="custom-textarea__label" for="bio">О себе</label>
                  <textarea class="custom-textarea__field" name="bio" id="bio" placeholder="О себе"
                    v-model="form.bio"> </textarea>
                  <span class="custom-textarea__error">{{ errors.bio }}</span>
                </div>
              </fieldset>
              <fieldset class="form__group">
                <legend class="form__group-name">Смена пароля</legend>
                <div class="custom-input form__group-item" :class="{ 'custom-input--error': !!errors.password }">
                  <label class="custom-input__label" for="password">
                    <span class="custom-input__label-text">Пароль</span>
                  </label>
                  <input class="custom-input__field" name="password" id="password" type="password" placeholder="Пароль"
                    v-model="form.password" @input="clearErrors">
                  <span class="custom-input__error">{{ errors.password }}</span>
                </div>
                <div class="custom-input form__group-item" :class="{ 'custom-input--error': !!errors.confirmPassword }">
                  <label class="custom-input__label" for="confirmPassword">
                    <span class="custom-input__label-text">Повторите пароль</span>
                  </label>
                  <input class="custom-input__field" name="confirmPassword" id="confirmPassword" type="password"
                    placeholder="Повторите пароль" v-model="form.confirmPassword" @input="clearErrors">
                  <span class="custom-input__error">{{ errors.confirmPassword }}</span>
                </div>
              </fieldset>
              <div class="form__wrapper">
                <button class="form__btn-register btn btn--secondary" type="button"
                  @click="toggleEditingProfile">Назад</button>
                <button class="form__btn--login btn btn--primary" type="submit">{{ isLoading ? 'Загрузка...' :
                  'Сохранить' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
