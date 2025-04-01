<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  status: Status
  tasks: Task[] | undefined
}>()
const filteredTasks = ref<Task[]>([])

const filterTasks = () => {
  if (props.tasks) filteredTasks.value = props.tasks.filter((task) => task.status === props.status)
}

watchEffect(() => {
  filterTasks()
})
</script>

<template>
  <div class="column">
    <h3>{{ props.status }}</h3>
    <div class="card-wrapper">
      <div class="card" v-for="task in filteredTasks" :key="task.id">{{ task.title }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.column {
  border: 1px solid black;
  min-height: 100px;
  padding: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: flex-start;

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card {
    border: 1px solid black;
    padding: 10px;
  }
}
</style>
