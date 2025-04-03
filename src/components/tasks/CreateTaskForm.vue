<script setup lang="ts">
import { ref, watch } from 'vue'
import AppButton from '../shared/AppButton.vue'
import { createTask, updateProject } from '@/api/api'
import { assignees } from '@/assets/assignees'
import { toast } from 'vue3-toastify'
import { vMaska } from 'maska/vue'

const props = defineProps<{
  toggleIsCreateModalShown: () => void
  project: Project
}>()

const emit = defineEmits(['taskCreated'])

const title = ref('')
const description = ref('')
const assignee = ref('')
const unmaskedDeadline = ref('')
const maskedDeadline = ref('')
const isValid = ref(false)
const isLoading = ref(false)

const projectTitleMinLength = 5

const setIsValid = () => {
  isValid.value = title.value.length >= projectTitleMinLength
}

const createNewProject = async () => {
  isLoading.value = true
  const task: TaskDto = {
    title: title.value,
    assignee: assignee.value,
    deadline: maskedDeadline.value,
    status: 'todo',
    projectId: props.project.id,
  }
  try {
    const res = await createTask(task)
    if (res && props.project) {
      const updatedProject = {
        ...props.project,
        tasks: [...props.project.tasks, res.id],
      }
      await updateProject(updatedProject, props.project.id)

      emit('taskCreated', res.id)
      props.toggleIsCreateModalShown()
    }
  } catch (e) {
    console.log(e)
    isLoading.value = false
  } finally {
    isLoading.value = false
    toast.success('Завдання створено!', {
      autoClose: 2000,
    })
  }
}

watch(title, setIsValid)

defineExpose({ unmaskedDeadline })
</script>

<template>
  <form class="form">
    <div>
      <label for="title">Назва завдання</label>
      <input
        v-model="title"
        placeholder="Введіть назву завдання"
        id="title"
        :errorMessage="!isValid ? 'Введіть від 5 символів' : ''"
      />
    </div>

    <div>
      <label for="assignee"> Вибір виконавця:</label>
      <select name="assignee" v-model="assignee">
        <option v-for="assignee in assignees" :key="assignee" :value="assignee">
          {{ assignee }}
        </option>
      </select>
    </div>

    <div>
      <label for="description">Опис завдання</label>
      <input v-model="description" placeholder="Введіть опис проекту" id="description" />
    </div>

    <div>
      <label for="deadline">Срок виконання</label>
      <input
        v-model="maskedDeadline"
        v-maska:unmaskedDeadline.unmasked="'####-##-##'"
        placeholder="РРРР-ММ-ДД"
        id="maskedDeadline"
      />
    </div>

    <AppButton :isLoading="isLoading" :disabled="!isValid" @click="createNewProject"
      >Створити</AppButton
    >
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  max-width: 400px;
}
</style>
