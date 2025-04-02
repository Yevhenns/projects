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
  width: 80%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

th {
  background-color: #3498db;
  color: white;
  padding: 12px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid #2980b9;
}

td {
  padding: 10px 20px;
  text-align: left;
  font-size: 14px;
  color: #333;
  border-top: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f4f6f9;
}

tr:hover {
  background-color: #eaf1f7;
  cursor: pointer;
}

tr.cursor-move {
  cursor: move;
}

td p {
  margin: 0;
  word-wrap: break-word;
}
</style>
