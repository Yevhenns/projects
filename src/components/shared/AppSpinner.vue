<script setup lang="ts"></script>

<template>
  <Teleport to="body">
    <div class="wrapper">
      <span class="spinner" />
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    display: block;
    width: 50px;
    height: 50px;
    border: 3px solid #007bff;
    border-bottom-color: transparent;
    border-radius: 100%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin-left: auto;
    margin-right: auto;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
