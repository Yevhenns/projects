import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTasks } from '@/api/api'

export const useTasksStore = defineStore('tasks', () => {
  const allTasks = ref<Task[]>([])

  function setAllTasks(tasks: Task[]) {
    allTasks.value = tasks
  }

  async function getAllTasks() {
    try {
      const tasks = await getTasks()
      allTasks.value = tasks
    } catch (e) {
      console.log(e)
    }
  }

  return { allTasks, setAllTasks, getAllTasks }
})
