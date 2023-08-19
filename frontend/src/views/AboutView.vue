<script></script>
<template lang="pug">
h2 Log in to MovieDB
  <div class="about">
    <h1>This is an about page</h1>
    //- p(v-if="user") You are logged in as {{ user?.data?.email }} p(v-if="user") Logged in as:
    //- {{ user?.email }}
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
