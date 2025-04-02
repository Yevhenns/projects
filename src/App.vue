<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'vue3-toastify/dist/index.css'
</script>

<template>
  <header class="header">
    <nav>
      <RouterLink class="link" to="/">Home</RouterLink>
    </nav>
  </header>

  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.header {
  background-color: #333;
  color: #fff;
  border-bottom: 1px solid #444;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
}

.main {
  padding: 20px;
}
</style>
