<script setup lang="ts">
import { useRegisterForm } from '@/composables/useRegisterForm';
import CommonIcon from '@/components/common/CommonIcon.vue';

const { form, errors, formError, isLoading, handleSubmit, clearErrors } = useRegisterForm();

</script>

<template>
  <main>
    <section class="register">
      <div class="container">
        <div class="register__wrapper">
          <div class="register__content">
            <h2 class="register__title">Регистрация</h2>
            <form class="form register-form" :class="{ 'form--error': !!formError }" @submit.prevent="handleSubmit"
              novalidate>
              <fieldset class="form__group">
                <span class="form__error">{{ formError }}</span>
                <div class="custom-input form__group-item form__group-item--two-cols"
                  :class="{ 'custom-input--error': !!errors.email }">
                  <label class="custom-input__label" for="email">
                    <CommonIcon iconName="IconAsterisk" />
                    <span class="custom-input__label-text">Email</span>
                  </label>
                  <input class="custom-input__field" name="email" id="email" type="email" placeholder="Email"
                    v-model="form.email" @input="clearErrors">
                  <span class="custom-input__error">{{ errors.email }}</span>
                </div>
                <div class="custom-input form__group-item" :class="{ 'custom-input--error': !!errors.password }">
                  <label class="custom-input__label" for="password">
                    <CommonIcon iconName="IconAsterisk" />
                    <span class="custom-input__label-text">Пароль</span>
                  </label>
                  <input class="custom-input__field" name="password" id="password" type="password" placeholder="Пароль"
                    v-model="form.password" @input="clearErrors">
                  <span class="custom-input__error">{{ errors.password }}</span>
                </div>
                <div class="custom-input form__group-item" :class="{ 'custom-input--error': !!errors.confirmPassword }">
                  <label class="custom-input__label" for="confirmPassword">
                    <CommonIcon iconName="IconAsterisk" />
                    <span class="custom-input__label-text">Повторите пароль</span>
                  </label>
                  <input class="custom-input__field" name="confirmPassword" id="confirmPassword" type="password"
                    placeholder="Повторите пароль" v-model="form.confirmPassword" @input="clearErrors">
                  <span class="custom-input__error">{{ errors.confirmPassword }}</span>
                </div>
              </fieldset>
              <div class="form__wrapper">
                <button class="form__btn--login btn btn--primary" type="submit">{{ isLoading ? 'Загрузка...' :
                  'Зарегистрироваться' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
