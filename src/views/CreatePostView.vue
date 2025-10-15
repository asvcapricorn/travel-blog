<script setup lang="ts">
</script>

<template>
  <main>
    <section class="profile">
      <div class="container">
        <h1 class="profile__title">Мой аккаунт</h1>
        <div class="profile__switcher">
          <RouterLink class="profile__link" to="/profile/favourites">
            <svg class="profile__link-icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="@/assets/images/sprite.svg#icon-fav"></use>
            </svg>
            <span class="profile__link-title">Избранные фильмы</span>
            <span class="profile__link-title profile__link-title--mobile">Избранное</span>
          </RouterLink>
          <RouterLink class="profile__link" to="/profile/settings">
            <svg class="profile__link-icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="@/assets/images/sprite.svg#icon-user"></use>
            </svg>
            <span class="profile__link-title">Настройки аккаунта</span>
            <span class="profile__link-title profile__link-title--mobile">Настройки</span>
          </RouterLink>
        </div>
        <RouterView />
      </div>
    </section>
  </main>
</template>
