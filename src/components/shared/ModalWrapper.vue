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
        <button class="close-btn" @click="toggleIsCreateModalShown">
          <i class="pi pi-times" style="font-size: 16px"></i>
        </button>
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
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #f0f0f0;
    transform: scale(1.1);
  }

  &:active {
    background: #e0e0e0;
    transform: scale(1);
  }
}
</style>
