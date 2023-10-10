<script setup>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const { data } = await axios.get('/users')
</script>

<template lang="pug">
div.container
    div.bs-docs-section
        div.row
            div.col-md-12.mt-5
            h2.mb-3 My Movie DB
            p.padding-left This is a simple Vue.js frontend with a Node.js backend. The backend is using Express.js and MongoDB.
            div.padding-left
              | If you want to benefit from the functionality of the site, it's best to log in - with or without your own account.
              br
              | For more information, please visit the 'About' page.
</template>

<style scoped>
.padding-left {
  padding-left: 12px;
}
</style>
