<script setup lang="ts">
import { useLoginForm } from '@/composables/useLoginForm';
import CommonIcon from '@/components/common/CommonIcon.vue';

const { form, errors, formError, isLoading, handleSubmit } = useLoginForm();

</script>

<template>
  <main>
    <section class="login">
      <div class="container">
        <div class="login__wrapper">
          <div class="login__content">
            <h2 class="login__title">Вход в профиль</h2>
            <form class="form login-form" :class="{ 'form--error': !!formError }" @submit.prevent="handleSubmit"
              novalidate>
              <div class="form__group">
                <span class="form__error">{{ formError }}</span>
                <div class="custom-input form__group-item form__group-item--two-cols"
                  :class="{ 'custom-input--error': !!errors.email }">
                  <label class="custom-input__label" for="email">
                    <CommonIcon iconName="IconAsterisk" />
                    <span class="custom-input__label-text">Логин</span>
                  </label>
                  <input class="custom-input__field" name="email" id="email" type="email" placeholder="Email"
                    v-model="form.email">
                  <span class="custom-input__error">{{ errors.email }}</span>
                </div>
                <div class="custom-input form__group-item form__group-item--two-cols"
                  :class="{ 'custom-input--error': !!errors.password }">
                  <label class="custom-input__label" for="password">
                    <CommonIcon iconName="IconAsterisk" />
                    <span class="custom-input__label-text">Пароль</span>
                  </label>
                  <input class="custom-input__field" name="password" id="password" type="password" placeholder="Пароль"
                    v-model="form.password">
                  <span class="custom-input__error">{{ errors.password }}</span>
                </div>
              </div>
              <div class="form__wrapper">
                <RouterLink class="form__btn-register btn btn--secondary" to="/register">Зарегистрироваться</RouterLink>
                <button class="form__btn--login btn btn--primary" type="submit">{{ isLoading ? 'Загрузка...' : 'Войти'
                  }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
