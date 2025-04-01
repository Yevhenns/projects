<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects'
import { VueDraggable } from 'vue-draggable-plus'
import { useRouter } from 'vue-router'

const store = useProjectsStore()

const router = useRouter()

const goToProject = (id: string) => {
  store.setCurrentProjectById(id)
  router.push(`/${id}`)
}
</script>

<template>
  <VueDraggable v-model="store.projects" target=".sort-target" :animation="150">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Назва</th>
          <th>Кількість завдань</th>
          <th>Статус</th>
          <th>Дата створення</th>
        </tr>
      </thead>
      <tbody class="sort-target">
        <tr
          class="cursor-move"
          v-for="project in store.projects"
          :key="project.id"
          @click="goToProject(project.id)"
        >
          <td>
            <p>{{ project.id }}</p>
          </td>
          <td>
            <p>{{ project.title }}</p>
          </td>
          <td>
            <p>{{ project.tasks.length }}</p>
          </td>
          <td>
            <p>{{ project.status }}</p>
          </td>
          <td>
            <p>{{ project.createdAt }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </VueDraggable>
</template>

<style scoped lang="scss">
.table {
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  tr:nth-child(even) {
    background-color: #fff5cc;
  }

  td,
  th {
    border: 1px solid black;
    padding: 4px;
  }
}
</style>
