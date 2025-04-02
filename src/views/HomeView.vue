<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProjects } from '@/api/api'
import ModalWrapper from '@/components/ModalWrapper.vue'
import CreateProjectForm from '@/components/CreateProjectForm.vue'
import ProjectsTable from '../components/ProjectsTable.vue'
import { useProjectsStore } from '@/stores/projects'
import AppButton from '@/components/AppButton.vue'
import { toast } from 'vue3-toastify'

const projectsStore = useProjectsStore()

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
    <AppButton class="create-button" type="button" @click="toggleIsCreateModalShown"
      >Створити проект</AppButton
    >
    <p v-if="isLoading">Завантаження...</p>
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
</style>
