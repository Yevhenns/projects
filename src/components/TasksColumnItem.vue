<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps<{
  status: Status
  tasks: Task[]
}>()

const filteredTasks = ref<Task[]>([])

watchEffect(() => {
  if (props.tasks.length > 0) {
    filteredTasks.value = props.tasks.filter((task) => task.status === props.status)
  }
})
</script>

<template>
  <div class="column">
    <h3>{{ props.status }}</h3>
    <VueDraggable class="card-wrapper" v-model="filteredTasks" ghostClass="ghost" group="people">
      <div class="card" v-for="task in filteredTasks" :key="task.id">{{ task.title }}</div>
    </VueDraggable>
  </div>
</template>

<style scoped lang="scss">
.column {
  border: 1px solid black;
  padding: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: flex-start;
  border-radius: 10px;

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 50px;
  }

  .card {
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
  }
}
</style>
