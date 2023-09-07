import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAccountStore } from '../stores/account'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: () => import('../views/WatchListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/watchedlist',
      name: 'watchedlist',
      component: () => import('../views/WatchedListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useAccountStore()
  await store.fetchUser()
  if (to.meta.requiresAuth && !store.user) return '/login'
})

export default router
