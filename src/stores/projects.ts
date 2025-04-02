import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { getProjects } from '@/api/api'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const currentProject = useLocalStorage<Project | null>('currentProject', null, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: unknown) => JSON.stringify(v),
    },
  })
  const isLoadingProjects = ref(false)

  function setProjects(projectsArray: Project[]) {
    projects.value = projectsArray
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
    setProjects,
    setCurrentProjectById,
    setCurrentProjectHandler,
    getProjectsList,
  }
})
