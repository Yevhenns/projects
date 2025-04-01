<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects'
import { useRouter } from 'vue-router'

const store = useProjectsStore()

const router = useRouter()

const goToProject = (id: string) => {
  router.push(`/${id}`)
}
</script>

<template>
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

    <tbody>
      <tr v-for="project in store.projects" :key="project.id" @click="goToProject(project.id)">
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
