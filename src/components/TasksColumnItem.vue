<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps<{
  status: Status
  tasks: Task[]
}>()

const filteredTasks = ref<Task[]>([])

const getColumnName = () => {
  if (props.status === 'todo') return 'До виконання'
  if (props.status === 'in_progress') return 'В процесі'
  return 'Виконано'
}

const columnName = getColumnName()

watchEffect(() => {
  if (props.tasks.length > 0) {
    filteredTasks.value = props.tasks.filter((task) => task.status === props.status)
  }
})
</script>

<template>
  <div class="column">
    <h3>{{ columnName }}</h3>
    <VueDraggable class="card-wrapper" v-model="filteredTasks" ghostClass="ghost" group="people">
      <div :class="status" class="card" v-for="task in filteredTasks" :key="task.id">
        <p>ID: {{ task.id }}</p>
        <p>Назва: {{ task.title }}</p>
        <p>Виконавець: {{ task.assignee }}</p>
        <p>Срок виконання: {{ task.deadline }}</p>
        <p>Статус: {{ status }}</p>
      </div>
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
  border-radius: 20px;

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 50px;
  }

  .card {
    padding: 10px;
    border-radius: 10px;
  }

  .todo {
    background-color: #3498db;
  }

  .in_progress {
    background-color: #f39c12;
  }

  .done {
    background-color: #2ecc71;
  }
}
</style>
