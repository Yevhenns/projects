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

  .input {
    padding: 10px 20px;
    font-size: 16px;
    border: 2px solid #007bff;
    border-radius: 5px;
    background-color: #ffffff;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;

    &:focus {
      outline: none;
      border-color: #0056b3;
      box-shadow: 0 0 5px rgba(0, 91, 187, 0.4);
    }

    &::placeholder {
      color: #888;
    }

    &:disabled {
      background-color: #f5f5f5;
      border: 2px solid #ddd;
      color: #aaa;
      cursor: not-allowed;
    }
  }

  label {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 600;
    color: #333;
    display: inline-block;
  }
}
</style>
