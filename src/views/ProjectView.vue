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

const store = useProjectsStore()
const { currentProject, setCurrentProjectHandler } = store

const tasksStore = useTasksStore()
const { getAllTasks } = tasksStore

const router = useRouter()

const isCreateModalShown = ref(false)

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshTasks = async (taskId: string) => {
  if (currentProject) {
    try {
      const updatedProject = {
        ...currentProject,
        tasks: [...currentProject.tasks, taskId],
      }
      setCurrentProjectHandler(updatedProject)
      await getAllTasks()
    } catch (e) {
      console.log(e)
    }
  }
}

const deleteProject = async () => {
  if (currentProject) {
    try {
      await deleteProjectById(currentProject?.id)
      await nextTick()
    } catch (e) {
      console.log(e)
    } finally {
      router.push({ path: '/', state: { project: 'deleted' } })
    }
  }
}

onMounted(() => {
  getAllTasks()
})

watchEffect(() => {
  if (!currentProject) router.push('/')
})
</script>

<template>
  <div>
    <h1>Сторінка проекту</h1>
    <AppButton type="button" @click="toggleIsCreateModalShown">Створити завдання</AppButton>
    <p>ID: {{ currentProject?.id }}</p>
    <p>Назва: {{ currentProject?.title }}</p>
    <p>Опис: {{ currentProject?.description }}</p>
    <p>Статус: {{ currentProject?.status }}</p>
    <p>Створено: {{ currentProject?.createdAt }}</p>
    <AppButton @click="deleteProject">Видалити проект</AppButton>
    <h2>Завдання</h2>
    <ModalWrapper v-if="currentProject" :isCreateModalShown :toggleIsCreateModalShown>
      <CreateTaskForm
        :toggleIsCreateModalShown
        :project="currentProject"
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
