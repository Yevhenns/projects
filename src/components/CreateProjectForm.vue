<script setup lang="ts">
import { ref, watch } from 'vue'
import AppButton from './AppButton.vue'
import { createProject } from '@/api/api'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  toggleIsCreateModalShown: () => void
}>()

const emit = defineEmits(['projectCreated'])

const title = ref('')
const description = ref('')
const isValid = ref(false)
const isLoading = ref(false)

const projectTitleMinLength = 5

const setIsValid = () => {
  isValid.value = title.value.length >= projectTitleMinLength
}

const createNewProject = async () => {
  isLoading.value = true
  const project: ProjectDto = {
    title: title.value,
    description: description.value,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'todo',
    tasks: [],
  }
  try {
    const res = await createProject(project)
    if (res) {
      emit('projectCreated')
      props.toggleIsCreateModalShown()
    }
  } catch (e) {
    console.log(e)
    isLoading.value = false
  } finally {
    isLoading.value = false
    toast.success('Проект створено!', {
      autoClose: 2000,
    })
  }
}

watch(title, setIsValid)
</script>

<template>
  <form class="form">
    <div>
      <label for="title"> Назва проекту </label>
      <input
        class="input"
        v-model="title"
        placeholder="Введіть назву проекту"
        id="title"
        :errorMessage="!isValid ? 'Введіть від 5 символів' : ''"
      />
    </div>
    <div>
      <label for="description">Опис проекту </label>
      <input
        class="input"
        v-model="description"
        placeholder="Введіть опис проекту"
        id="description"
      />
    </div>
    <AppButton :isLoading="isLoading" :disabled="!isValid" @click="createNewProject">
      Створити
    </AppButton>
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
