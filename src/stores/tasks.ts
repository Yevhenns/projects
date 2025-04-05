import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTasks } from '@/api/api'

export const useTasksStore = defineStore('tasks', () => {
  const allTasks = ref<Task[]>([])
  const isLoadingTasks = ref(false)

  function setAllTasks(tasks: Task[]) {
    allTasks.value = tasks
  }

  async function getAllTasks() {
    isLoadingTasks.value = true
    try {
      const tasks = await getTasks()
      allTasks.value = tasks
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingTasks.value = false
    }
  }

  return { allTasks, isLoadingTasks, setAllTasks, getAllTasks }
})
