<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProjects } from '@/api/api'
import ModalWrapper from '@/components/ModalWrapper.vue'
import CreateProjectForm from '@/components/CreateProjectForm.vue'
import ProjectsTable from '../components/ProjectsTable.vue'

const projects = ref<Project[]>([])
const isCreateModalShown = ref(false)
const isLoading = ref(false)

const getProjectsList = async () => {
  isLoading.value = true
  try {
    projects.value = await getProjects()
  } catch (error) {
    console.error('Помилка', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getProjectsList()
})

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshProjects = async () => {
  await getProjectsList()
}
</script>

<template>
  <main>
    <button type="button" @click="toggleIsCreateModalShown">Створити</button>
    <p v-if="isLoading">Завантаження...</p>
    <ProjectsTable v-if="projects.length > 0" :projects />
    <ModalWrapper :isCreateModalShown :toggleIsCreateModalShown>
      <CreateProjectForm :toggleIsCreateModalShown @projectCreated="refreshProjects" />
    </ModalWrapper>
  </main>
</template>
