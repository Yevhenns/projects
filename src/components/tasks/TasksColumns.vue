<script setup lang="ts">
import { computed } from 'vue'
import TasksColumnItem from './TasksColumnItem.vue'
import { useTasksStore } from '@/stores/tasks'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()

const tasks = computed(() => {
  return tasksStore.allTasks.filter((task) => task.projectId === projectsStore.currentProject?.id)
})
</script>

<template>
  <h2 v-if="tasks.length === 0" class="heading">Немає завдань</h2>
  <div v-if="tasks.length > 0">
    <h2 class="heading">Завдання</h2>
    <div class="columnsWrapper">
      <TasksColumnItem :tasks="tasks" status="todo" />
      <TasksColumnItem :tasks="tasks" status="in_progress" />
      <TasksColumnItem :tasks="tasks" status="done" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.heading {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}

.columnsWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}
</style>
