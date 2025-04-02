<script setup lang="ts">
import { deleteProjectById } from '@/api/api'
import AppButton from '@/components/AppButton.vue'
import CreateTaskForm from '@/components/CreateTaskForm.vue'
import ModalWrapper from '@/components/ModalWrapper.vue'
import TasksColumns from '@/components/TasksColumns.vue'
import { useProjectsStore } from '@/stores/projects'
import { useTasksStore } from '@/stores/tasks'
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()

const router = useRouter()

const isCreateModalShown = ref(false)

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshTasks = async () => {
  try {
    const response = await projectsStore.getProjectsList()
    if (response) {
      await tasksStore.getAllTasks()
    }
  } catch (e) {
    console.log(e)
  }
}

const deleteProject = async () => {
  if (projectsStore.currentProject) {
    try {
      await deleteProjectById(projectsStore.currentProject?.id)
    } catch (e) {
      console.log(e)
    } finally {
      router.push({ path: '/', state: { project: 'deleted' } })
    }
  }
}

onMounted(async () => {
  await projectsStore.getProjectsList()
  await tasksStore.getAllTasks()
})

watchEffect(() => {
  if (!projectsStore.currentProjectId) router.push('/')
})
</script>

<template>
  <div>
    <div class="project-info">
      <h1>Сторінка проекту "{{ projectsStore.currentProject?.title }}"</h1>
      <p>ID: {{ projectsStore.currentProject?.id }}</p>
      <p>Опис: {{ projectsStore.currentProject?.description }}</p>
      <p>Статус: {{ projectsStore.currentProject?.status }}</p>
      <p>Створено: {{ projectsStore.currentProject?.createdAt }}</p>
    </div>

    <div class="project-actions">
      <AppButton type="button" @click="toggleIsCreateModalShown">Створити завдання</AppButton>
      <AppButton @click="deleteProject">Видалити проект</AppButton>
    </div>

    <ModalWrapper v-if="projectsStore.currentProject" :isCreateModalShown :toggleIsCreateModalShown>
      <CreateTaskForm
        :toggleIsCreateModalShown
        :project="projectsStore.currentProject"
        @taskCreated="refreshTasks"
      />
    </ModalWrapper>

    <TasksColumns />
  </div>
</template>

<style scoped lang="scss">
.project-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.project-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }

  p {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
  }

  strong {
    font-weight: bold;
  }
}

.project-actions {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
}
</style>
