<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshProjects = async () => {
  await projectsStore.getProjectsList()
}

if (history.state.project === 'deleted') {
  toast.success('Проект видалено!', { autoClose: 2000 })
  history.replaceState({}, '')
}

onMounted(async () => {
  await projectsStore.getProjectsList()
  projectsStore.setCurrentProjectHandler(null)
  await tasksStore.getAllTasks()
})
</script>

<template>
  <div class="page">
    <AppButton class="create-button" type="button" @click="toggleIsCreateModalShown">
      Створити проект
    </AppButton>

    <ProjectsTable v-if="projectsStore.projects.length > 0" />

    <h2 class="title" v-if="projectsStore.projects.length === 0">Немає проектів</h2>

    <Teleport to="body">
      <div v-if="projectsStore.isLoadingProjects" class="loading-wrapper">
        <p>Завантаження...</p>
      </div>
    </Teleport>

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

.heading {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
</style>
