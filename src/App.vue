<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'vue3-toastify/dist/index.css'
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid black;
  padding: 20px;
}

.main {
  padding: 20px;
}
</style>
