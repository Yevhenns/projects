<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProjects } from '@/api/api'
import ModalWrapper from '@/components/ModalWrapper.vue'
import CreateProjectForm from '@/components/CreateProjectForm.vue'
import ProjectsTable from '../components/ProjectsTable.vue'
import { useProjectsStore } from '@/stores/projects'
import AppButton from '@/components/AppButton.vue'
import { toast } from 'vue3-toastify'
import { useTasksStore } from '@/stores/tasks'

const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()

const isCreateModalShown = ref(false)
const isLoading = ref(false)

const getProjectsList = async () => {
  isLoading.value = true
  try {
    projectsStore.setProjects(await getProjects())
  } catch (error) {
    console.error('Помилка', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getProjectsList()
  projectsStore.setCurrentProjectHandler(null)
  await tasksStore.getAllTasks()
})

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshProjects = async () => {
  await getProjectsList()
}

if (history.state.project === 'deleted') {
  toast.success('Проект видалено!', { autoClose: 2000 })
  history.replaceState({}, '')
}
</script>

<template>
  <div class="page">
    <AppButton class="create-button" type="button" @click="toggleIsCreateModalShown">
      Створити проект
    </AppButton>

    <Teleport to="body">
      <div v-if="isLoading" class="loading-wrapper">
        <p>Завантаження...</p>
      </div>
    </Teleport>

    <ProjectsTable v-if="projectsStore.projects.length > 0" />

    <ModalWrapper :isCreateModalShown :toggleIsCreateModalShown>
      <CreateProjectForm :toggleIsCreateModalShown @projectCreated="refreshProjects" />
    </ModalWrapper>
  </div>
</template>

<style scoped lang="scss">
.create-button {
  margin-bottom: 20px;
}

.loading-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
