<script setup lang="ts">
defineProps<{
  isLoading?: boolean
}>()
</script>

<template>
  <button class="button" type="button">
    <p v-if="isLoading">Завантаження</p>
    <slot v-if="!isLoading"></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #007bff;
  background-color: #007bff;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #aaa;
    border: 2px solid #ddd;
    cursor: not-allowed;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}
</style>
