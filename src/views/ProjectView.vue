<script setup lang="ts">
import { deleteProjectById } from '@/api/api'
import AppButton from '@/components/AppButton.vue'
import CreateTaskForm from '@/components/CreateTaskForm.vue'
import ModalWrapper from '@/components/ModalWrapper.vue'
import TasksColumns from '@/components/TasksColumns.vue'
import { useProjectsStore } from '@/stores/projects'
import { useTasksStore } from '@/stores/tasks'
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()

const router = useRouter()

const isCreateModalShown = ref(false)

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshTasks = async (taskId: string) => {
  if (projectsStore.currentProject) {
    try {
      const updatedProject = {
        ...projectsStore.currentProject,
        tasks: [...projectsStore.currentProject.tasks, taskId],
      }
      projectsStore.setCurrentProjectHandler(updatedProject)
      await tasksStore.getAllTasks()
    } catch (e) {
      console.log(e)
    }
  }
}

const deleteProject = async () => {
  if (projectsStore.currentProject) {
    try {
      await deleteProjectById(projectsStore.currentProject?.id)
      await nextTick()
    } catch (e) {
      console.log(e)
    } finally {
      router.push({ path: '/', state: { project: 'deleted' } })
    }
  }
}

onMounted(() => {
  tasksStore.getAllTasks()
})

watchEffect(() => {
  if (!projectsStore.currentProject) router.push('/')
})
</script>

<template>
  <div>
    <h1>Сторінка проекту</h1>
    <AppButton type="button" @click="toggleIsCreateModalShown">Створити завдання</AppButton>
    <p>ID: {{ projectsStore.currentProject?.id }}</p>
    <p>Назва: {{ projectsStore.currentProject?.title }}</p>
    <p>Опис: {{ projectsStore.currentProject?.description }}</p>
    <p>Статус: {{ projectsStore.currentProject?.status }}</p>
    <p>Створено: {{ projectsStore.currentProject?.createdAt }}</p>
    <AppButton @click="deleteProject">Видалити проект</AppButton>
    <h2>Завдання</h2>
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
.columnsWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
