<script setup lang="ts">
import { getTasks } from '@/api/api'
import CreateTaskForm from '@/components/CreateTaskForm.vue'
import ModalWrapper from '@/components/ModalWrapper.vue'
import { useProjectsStore } from '@/stores/projects'
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const store = useProjectsStore()
const { currentProject, setCurrentProjectHandler } = store

const router = useRouter()

const isCreateModalShown = ref(false)

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const tasks = ref()

const getAllTasks = async () => {
  try {
    const allTasks = await getTasks()
    const filteredTasks = allTasks.filter((task) => currentProject?.tasks.includes(task.id))
    console.log(filteredTasks)
    tasks.value = filteredTasks
  } catch (e) {
    console.log(e)
  }
}

const refreshTasks = async (taskId: string) => {
  try {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        tasks: [...currentProject.tasks, taskId],
      }
      setCurrentProjectHandler(updatedProject)
      await getAllTasks()
    }
  } catch (e) {
    console.log(e)
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
  <div class="project">
    <h1>Сторінка проекту</h1>
    <button type="button" @click="toggleIsCreateModalShown">Створити</button>
    <p>ID: {{ currentProject?.id }}</p>
    <p>Назва: {{ currentProject?.title }}</p>
    <p>Опис: {{ currentProject?.description }}</p>
    <p>Статус: {{ currentProject?.status }}</p>
    <p>Створено: {{ currentProject?.createdAt }}</p>
    <h2>Список завдань</h2>
    <ModalWrapper v-if="currentProject" :isCreateModalShown :toggleIsCreateModalShown>
      <CreateTaskForm
        :toggleIsCreateModalShown
        :project="currentProject"
        @taskCreated="refreshTasks"
      />
    </ModalWrapper>
    <p>{{ tasks }}</p>
  </div>
</template>

<style scoped lang="scss">
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
