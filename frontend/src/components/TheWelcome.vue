<script setup>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const { data } = await axios.get('/users')
</script>

<template>
  <h1>Movie DB Users</h1>
  <ul>
    <li v-for="user in data" :key="user.id">{{ user.firstName }} {{ user.surName }}</li>
  </ul>
</template>
