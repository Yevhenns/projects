<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import { getProjects } from '@/api/api'
import ModalWrapper from '@/components/ModalWrapper.vue'
import CreateProjectForm from '@/components/CreateProjectForm.vue'

const projects = ref<null | Project[]>(null)
const isCreateModalShown = ref(false)

onMounted(async () => {
  projects.value = await getProjects()
})

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshProjects = async () => {
  projects.value = await getProjects()
}
</script>

<template>
  <main>
    <button type="button" @click="toggleIsCreateModalShown">Створити</button>
    <TheWelcome />
    <p>{{ projects?.length }}</p>
    <ModalWrapper :isCreateModalShown :toggleIsCreateModalShown
      ><CreateProjectForm :toggleIsCreateModalShown @projectCreated="refreshProjects"
    /></ModalWrapper>
  </main>
</template>
