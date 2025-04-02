import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProjects } from '@/api/api'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const filteredProjects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
  const isLoadingProjects = ref(false)

  function setProjects(projectsArray: Project[]) {
    projects.value = projectsArray
  }

  function setFilteredProjects(projectsArray: Project[]) {
    filteredProjects.value = projectsArray
  }

  const setCurrentProjectById = (id: string) => {
    const project = projects.value.find((item) => item.id === id)
    if (project) {
      currentProject.value = project
    }
  }

  const setCurrentProjectHandler = (project: Project | null) => {
    currentProject.value = project
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
    setProjects,
    setCurrentProjectById,
    setCurrentProjectHandler,
    getProjectsList,
    setFilteredProjects,
  }
})
