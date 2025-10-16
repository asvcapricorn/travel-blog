import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    } /*,
    {
      path: '/genres',
      name: 'genres',
      component: () => import('../views/GenresView.vue'),
    },
    {
      path: '/moviesByGenre/:genre',
      name: 'moviesByGenre',
      component: () => import('../views/MoviesByGenreView.vue'),
    },
    {
      path: '/movie/:movieId',
      name: 'movie',
      component: () => import('../views/MovieView.vue'),
    },
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
