<script setup lang="ts">
import { deleteTaskById, updateProject } from '@/api/api'
import { useProjectsStore } from '@/stores/projects'
import { ref, watchEffect } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps<{
  status: Status
  tasks: Task[]
}>()

const projectsStore = useProjectsStore()

const filteredTasks = ref<Task[]>([])

const getColumnName = () => {
  if (props.status === 'todo') return 'До виконання'
  if (props.status === 'in_progress') return 'В процесі'
  return 'Виконано'
}

const columnName = getColumnName()

const deleteTask = async (id: string, projectId: string) => {
  const filteredTasks = projectsStore.currentProject?.tasks.filter((item) => item !== id)
  try {
    if (projectsStore.currentProject) {
      const updatedProject = {
        ...projectsStore.currentProject,
        tasks: [...(filteredTasks || [])],
      }
      if (updatedProject) await updateProject(updatedProject, projectId)
    }

    await deleteTaskById(id)
  } catch (e) {
    console.log(e)
  }
}

watchEffect(() => {
  if (props.tasks.length > 0) {
    filteredTasks.value = props.tasks.filter((task) => task.status === props.status)
  }
})
</script>

<template>
  <div class="column">
    <h3 class="title">{{ columnName }}</h3>
    <VueDraggable class="card-wrapper" v-model="filteredTasks" ghostClass="ghost" group="people">
      <div :class="status" class="card" v-for="task in filteredTasks" :key="task.id">
        <p>ID: {{ task.id }}</p>
        <p>Назва: {{ task.title }}</p>
        <p>Виконавець: {{ task.assignee }}</p>
        <p>Срок виконання: {{ task.deadline }}</p>
        <p>Статус: {{ columnName }}</p>
        <button @click="deleteTask(task.id, task.projectId)"></button>
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped lang="scss">
.column {
  border: 1px solid #ddd;
  padding: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-self: flex-start;
  border-radius: 15px;
  background-color: #f4f7f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9eff1;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 50px;
  }

  .card {
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-3px);
    }
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
