import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: () => import('../views/PostView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    } /*,
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      children: [
        {
          path: '',
          redirect: '/profile/favourites',
        },
        {
          path: 'favourites',
          component: () => import('../components/FavouriteMovies.vue'),
        },
        {
          path: 'settings',
          component: () => import('../components/UserSettings.vue'),
        },
      ],
    },*/,
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
