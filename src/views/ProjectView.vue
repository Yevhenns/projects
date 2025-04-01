<script setup lang="ts">
import CreateTaskForm from '@/components/CreateTaskForm.vue'
import ModalWrapper from '@/components/ModalWrapper.vue'
import { useProjectsStore } from '@/stores/projects'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const store = useProjectsStore()
const { currentProject } = store

const router = useRouter()

const isCreateModalShown = ref(false)

const toggleIsCreateModalShown = () => {
  isCreateModalShown.value = !isCreateModalShown.value
}

watchEffect(() => {
  if (!currentProject) router.push('/')
})
</script>

<template>
  <div class="project">
    <p>{{ currentProject }}</p>
    <h1>Сторінка проекту</h1>
    <button type="button" @click="toggleIsCreateModalShown">Створити</button>
    <p>Назва: {{ currentProject?.title }}</p>
    <p>Опис: {{ currentProject?.description }}</p>
    <p>Статус: {{ currentProject?.status }}</p>
    <p>Створено: {{ currentProject?.createdAt }}</p>
    <h2>Список завдань</h2>
    <ModalWrapper v-if="currentProject" :isCreateModalShown :toggleIsCreateModalShown>
      <CreateTaskForm :toggleIsCreateModalShown :project="currentProject" />
    </ModalWrapper>
  </div>
</template>

<style scoped lang="scss">
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
