<script setup lang="ts">
import { ref } from 'vue'
import TasksColumnItem from './TasksColumnItem.vue'
import { useTasksStore } from '@/stores/tasks'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()

const list1 = tasksStore.allTasks.filter(
  (task) => task.projectId === projectsStore.currentProject?.id,
)

const list2 = ref(
  list1.map((item) => ({
    name: `${item.title}-2`,
    id: `${item.id}-2`,
  })) as unknown as Task[],
)

const list3 = ref(
  list1.map((item) => ({
    name: `${item.title}-3`,
    id: `${item.id}-3`,
  })) as unknown as Task[],
)
</script>

<template>
  <div class="columnsWrapper">
    <TasksColumnItem :tasks="list1" status="todo" />
    <TasksColumnItem :tasks="list2" status="in_progress" />
    <TasksColumnItem :tasks="list3" status="done" />
  </div>
</template>

<style scoped lang="scss">
.columnsWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
