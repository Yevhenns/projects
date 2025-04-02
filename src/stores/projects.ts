import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getProjects } from '@/api/api'
import { useLocalStorage } from '@vueuse/core'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const filteredProjects = ref<Project[]>([])
  const isLoadingProjects = ref(false)
  const currentProjectId = useLocalStorage<string | null>('currentProjectId', null)
  const currentProject = computed(
    () => projects.value.find((item) => item.id === currentProjectId.value) || null,
  )

  function setProjects(projectsArray: Project[]) {
    projects.value = projectsArray
  }

  function setFilteredProjects(projectsArray: Project[]) {
    filteredProjects.value = projectsArray
  }

  const setCurrentProjectId = (id: string | null) => {
    currentProjectId.value = id
  }

  async function getProjectsList() {
    isLoadingProjects.value = true
    try {
      projects.value = await getProjects()
      return true
    } catch (error) {
      console.error('Помилка', error)
    } finally {
      isLoadingProjects.value = false
    }
  }

  return {
    projects,
    currentProject,
    isLoadingProjects,
    filteredProjects,
    currentProjectId,
    setProjects,
    getProjectsList,
    setFilteredProjects,
    setCurrentProjectId,
  }
})
