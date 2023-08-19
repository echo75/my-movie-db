<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useAccountStore } from './stores/account'
import { mapActions, mapState } from 'pinia'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Import Bootstrap JavaScript

export default {
  name: 'App',
  components: {
    HelloWorld,
    RouterLink,
    RouterView
  },
  async mounted() {
    await this.fetchUser()
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout'])
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template lang="pug">
header.p-3.text-bg-dark
  .container
    .d-flex.flex-wrap.align-items-center.justify-content-center.justify-content-lg-start
      ul.nav.col-12.col-lg-auto.me-lg-auto.mb-2.justify-content-center.mb-md-0
        li
          a.nav-link.px-2.text-white( :class="{ active: $route.path === '/' }", href='/') Home
        li
          a.nav-link.px-2.text-white(href='#') Search
        li
          a.nav-link.px-2.text-white(href='#') My Watchlist
        li
          a.nav-link.px-2.text-white(href='#') My Watched-List
        li
          a.nav-link.px-2.text-white(:class="{ active: $route.path === '/about' }", href='/about') About
      .text-end
        button.btn.btn-outline-light.me-2(type='button' v-if='!user' v-on:click="$router.push('/login')") Login
        button.btn.btn-outline-light.me-2(type='button' v-if='user' @click='logout') Log out
        button.btn.btn-outline-light(type='button' v-if='!user' v-on:click="$router.push('/signup')") Sign-up
<RouterView />
</template>

<style scoped>
html {
  height: 101% !important;
}
.nav-link.active {
  font-weight: 700;
  color: #ffca2b !important;
}
.nav-link:hover {
  color: #ffca2b !important;
}
.btn:hover {
  color: #212529;
  background-color: #ffca2b;
  border-color: #ffca2b;
}
</style>
