<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProjects } from '@/api/api'
import ModalWrapper from '@/components/ModalWrapper.vue'
import CreateProjectForm from '@/components/CreateProjectForm.vue'
import ProjectsTable from '../components/ProjectsTable.vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()

const isCreateModalShown = ref(false)
const isLoading = ref(false)

const getProjectsList = async () => {
  isLoading.value = true
  try {
    store.setProjects(await getProjects())
  } catch (error) {
    console.error('Помилка', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getProjectsList()
  store.setCurrentProjectHandler(null)
})

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshProjects = async () => {
  await getProjectsList()
}
</script>

<template>
  <div>
    <button type="button" @click="toggleIsCreateModalShown">Створити</button>
    <p v-if="isLoading">Завантаження...</p>
    <ProjectsTable v-if="store.projects.length > 0" />
    <ModalWrapper :isCreateModalShown :toggleIsCreateModalShown>
      <CreateProjectForm :toggleIsCreateModalShown @projectCreated="refreshProjects" />
    </ModalWrapper>
  </div>
</template>
