<script setup lang="ts">
import { deleteTaskById, updateProject, updateTask } from '@/api/api'
import { useProjectsStore } from '@/stores/projects'
import { useTasksStore } from '@/stores/tasks'
import { ref, watchEffect } from 'vue'
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  status: Status
  tasks: Task[]
}>()

const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()

const filteredTasks = ref<Task[]>([])

const getColumnName = () => {
  if (props.status === 'todo') return 'До виконання'
  if (props.status === 'in_progress') return 'В процесі'
  return 'Виконано'
}

const columnName = getColumnName()

const deleteTask = async (id: string, projectId: string) => {
  const filteredTasksArray = projectsStore.currentProject?.tasks.filter((item) => item !== id)
  try {
    if (projectsStore.currentProject) {
      const updatedProject = {
        ...projectsStore.currentProject,
        tasks: [...(filteredTasksArray || [])],
      }
      if (updatedProject) {
        await updateProject(updatedProject, projectId)
      }
    }
    const deleteResponse = await deleteTaskById(id)
    if (deleteResponse) {
      const response = await projectsStore.getProjectsList()
      if (response) {
        await tasksStore.getAllTasks()
      }
    }
  } catch (e) {
    console.log(e)
  } finally {
    toast.success('Завдання видалено!', { autoClose: 2000 })
  }
}

const onEnd = async (event: SortableEvent) => {
  const fromStatus = event.from.parentElement?.getAttribute('data-status')
  const toStatus = event.to.parentElement?.getAttribute('data-status')
  const currentTaskId = event.item.getAttribute('data-id')

  if (fromStatus === toStatus) {
    return
  }

  const currentTask = filteredTasks.value.find((item) => item.id === currentTaskId)

  const updatedTask = { ...currentTask, status: toStatus } as Task

  if (currentTaskId) {
    try {
      await updateTask({ task: updatedTask, taskId: currentTaskId })
    } catch (e) {
      console.log(e)
    }
  }
}

watchEffect(() => {
  if (props.tasks.length > 0) {
    filteredTasks.value = props.tasks.filter((task) => task.status === props.status)
  }
})
</script>

<template>
  <div class="column" :data-status="status">
    <h3 class="title">{{ columnName }}</h3>
    <VueDraggable
      class="card-wrapper"
      v-model="filteredTasks"
      ghostClass="ghost"
      group="tasks"
      @end="onEnd"
    >
      <div
        :class="status"
        class="card"
        v-for="task in filteredTasks"
        :key="task.id"
        :data-id="task.id"
      >
        <p>ID: {{ task.id }}</p>
        <p>Назва: {{ task.title }}</p>
        <p>Виконавець: {{ task.assignee }}</p>
        <p>Срок виконання: {{ task.deadline }}</p>
        <p>Статус: {{ columnName }}</p>
        <button class="delete-btn" @click="deleteTask(task.id, task.projectId)">
          <i class="pi pi-times" style="font-size: 16px"></i>
        </button>
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped lang="scss">
.column {
  border: 1px solid #ddd;
  padding: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-self: flex-start;
  border-radius: 15px;
  background-color: #f4f7f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9eff1;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 50px;
  }

  .card {
    position: relative;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-3px);
    }
  }

  .todo {
    background-color: #3498db;
  }

  .in_progress {
    background-color: #f39c12;
  }

  .done {
    background-color: #2ecc71;
  }

  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    background: white;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition:
      background 0.2s,
      transform 0.2s;

    &:hover {
      background: #f0f0f0;
      transform: scale(1.1);
    }

    &:active {
      background: #e0e0e0;
      transform: scale(1);
    }
  }
}
</style>
