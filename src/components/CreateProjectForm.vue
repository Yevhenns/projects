<script setup lang="ts">
import { ref, watch } from 'vue'
import AppButton from './AppButton.vue'
import { createProject } from '@/api/api'

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
    createdAt: new Date().toDateString(),
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
  }
}

watch(title, setIsValid)
</script>

<template>
  <form class="form">
    <label>
      Назва проекту
      <input
        v-model="title"
        placeholder="Введіть назву проекту"
        id="documentNumber"
        :errorMessage="!isValid ? 'Введіть від 5 символів' : ''"
    /></label>
    <label
      >Опис проекту
      <input v-model="description" placeholder="Введіть опис проекту" id="phoneNumber"
    /></label>

    <AppButton :isLoading="isLoading" :disabled="!isValid" @click="createNewProject"
      >Створити</AppButton
    >
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}
</style>
