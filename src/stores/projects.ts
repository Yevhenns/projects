import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])

  function setProjects(projectsArray: Project[]) {
    projects.value = projectsArray
  }

  return { projects, setProjects }
})
