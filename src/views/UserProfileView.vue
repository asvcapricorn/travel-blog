<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useProfileForm } from '@/composables/useProfileForm';
import { useUserStore } from '@/stores/user'
import CommonIcon from '@/components/common/CommonIcon.vue';

const { form, errors, formError, isLoading, handleSubmit, clearErrors, finishEditingProfile } = useProfileForm();
const userStore = useUserStore()

const userData = computed(() => {
  if (Object.keys(userStore.user).length !== 0) {
    return userStore.user
  }
  return JSON.parse(localStorage.getItem('user') || '{}')
});
const nameString = computed(() => userData.value.full_name || 'Пользователь');
const countryString = computed(() => userData.value.country || 'Не указана');
const cityString = computed(() => userData.value.city || 'Не указан');
const bioString = computed(() => userData.value.bio || 'Информация отсутствует');
const photoString = computed(() => userData.value.photo || '');

const profileIsEditing = ref(false);

watch(finishEditingProfile, (newValue) => {
  if (newValue) {
    profileIsEditing.value = false;
  }
})

const toggleEditingProfile = (): void => {
  profileIsEditing.value = !profileIsEditing.value;
  if (profileIsEditing.value) {
    finishEditingProfile.value = false;
    form.value.name = nameString.value;
    form.value.country = countryString.value;
    form.value.city = cityString.value;
    form.value.bio = bioString.value;
  }
}

const MAX_LENGTH = 600;
const maxLengthError = computed(() => form.value.bio.length === MAX_LENGTH);
const counter = computed(() => form.value.bio.length);

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

const inputFileEl = ref<HTMLInputElement | null>(null);
const fileName = ref('Изменить фото');
const uploadPhoto = () => {
  fileName.value = inputFileEl?.value?.files?.[0]?.name || 'Изменить фото';
}

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
            <div class="custom-file-input">
              <label class="custom-file-input__label" for="photo">
                <CommonIcon iconName="IconPhoto" />
                <span class="custom-file-input__label-text">{{ fileName }} </span>
              </label>
              <input class="custom-file-input__field" type="file" id="photo" name="photo" accept="image/*"
                @change="uploadPhoto" ref="inputFileEl">
            </div>
          </div>
          <div class="profile__info">
            <div class="profile__content">
              <div class="profile__title">
                <h2 class="profile__name">{{ nameString }}</h2>
                <button class="btn btn--icon profile__edit" type="button" @click="toggleEditingProfile">
                  <CommonIcon iconName="IconEdit" />
                </button>
              </div>
              <span class="profile__item">Страна:</span>
              <span class="profile__location">{{ countryString }}</span>
              <span class="profile__item">Город:</span>
              <span class="profile__location">{{ cityString }}</span>
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
                  :class="{ 'custom-textarea--error': maxLengthError }">
                  <label class="custom-textarea__label" for="bio">О себе</label>
                  <textarea class="custom-textarea__field" name="bio" id="bio" placeholder="О себе" v-model="form.bio"
                    :maxlength="MAX_LENGTH"> </textarea>
                  <span class="custom-textarea__counter">{{ counter }} / {{ MAX_LENGTH }}</span>
                </div>
              </fieldset>
              <fieldset class="form__group">
                <legend class="form__group-name">Смена пароля</legend>
                <div class="custom-input form__group-item" :class="{ 'custom-input--error': !!errors.password }">
                  <label class="custom-input__label" for="password">
                    <span class="custom-input__label-text">Новый пароль</span>
                  </label>
                  <input class="custom-input__field" name="password" id="password" type="password"
                    placeholder="Новый пароль" v-model="form.password" @input="clearErrors">
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
                <button class="btn btn--secondary" type="button" @click="toggleEditingProfile">Назад</button>
                <button class="btn btn--primary" type="submit" :disabled="isLoading">{{ isLoading ? 'Загрузка...' :
                  'Сохранить' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
