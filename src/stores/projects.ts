import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const currentProject = useLocalStorage<Project | null>('currentProject', null, {
    serializer: {
      read: (v: string) => (v ? JSON.parse(v) : null),
      write: (v: unknown) => JSON.stringify(v),
    },
  })

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

  return { projects, currentProject, setProjects, setCurrentProjectById, setCurrentProjectHandler }
})
