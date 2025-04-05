<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ModalWrapper from '@/components/shared/ModalWrapper.vue'
import CreateProjectForm from '@/components/projects/CreateProjectForm.vue'
import ProjectsTable from '../components/projects/ProjectsTable.vue'
import { useProjectsStore } from '@/stores/projects'
import AppButton from '@/components/shared/AppButton.vue'
import { toast } from 'vue3-toastify'
import { useTasksStore } from '@/stores/tasks'

const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()

const isCreateModalShown = ref(false)
const filter = ref('')

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const refreshProjects = async () => {
  const res = await projectsStore.getProjectsList()
  if (res) projectsStore.filteredProjects = projectsStore.projects
}

if (history.state.project === 'deleted') {
  toast.success('Проект видалено!', { autoClose: 2000 })
  history.replaceState({}, '')
}

if (history.state.project === 'was deleted') {
  toast.error('Проект було видалено!', { autoClose: 2000 })
  history.replaceState({}, '')
}

watch(
  filter,
  () =>
    (projectsStore.filteredProjects = projectsStore.projects.filter((item) =>
      item.title.includes(filter.value),
    )),
)

onMounted(async () => {
  await projectsStore.getProjectsList()
  projectsStore.setCurrentProjectId(null)
  await tasksStore.getAllTasks()
  projectsStore.filteredProjects = projectsStore.projects
})
</script>

<template>
  <div class="page">
    <div class="controls">
      <AppButton type="button" @click="toggleIsCreateModalShown"> Створити проект </AppButton>

      <input class="filter-input" placeholder="Фільтр" v-model="filter" />
    </div>

    <ProjectsTable v-if="projectsStore.filteredProjects.length > 0" />

    <h2
      class="title"
      v-if="projectsStore.filteredProjects.length === 0 && !projectsStore.isLoadingProjects"
    >
      Немає проектів
    </h2>

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

.controls {
  align-items: center;
  justify-content: flex-start;
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

.filter-input {
  width: 200px;
}

.heading {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
</style>
