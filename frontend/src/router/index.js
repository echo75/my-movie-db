import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import store from '../stores'

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
      component: () => import('../views/WatchListView.vue')
      // beforeEnter: (to, from, next) => {
      //   if (store.state.user) next('/')
      //   else next()
      // }
    },
    {
      path: '/watchedlist',
      name: 'watchedlist',
      component: () => import('../views/WatchedListView.vue')
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

export default router
