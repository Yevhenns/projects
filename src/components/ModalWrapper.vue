<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  isCreateModalShown: boolean
  toggleIsCreateModalShown: () => void
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="isCreateModalShown" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="toggleIsCreateModalShown">X</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
