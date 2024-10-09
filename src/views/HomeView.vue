<template>
  <main class="d-flex justify-content-center mt-5">
    <div style="width: 500px;">
      <h2 class="text-center my-4">TODO PROJECT</h2>
      <Taskform :tasks="tasks" @add-task="addTask" />

      <TaskList :tasks="tasks.filter(i => i.isActive || i.isEditing)" title="Todo List Active" />

      <TaskList :tasks="tasks.filter(i => !i.isActive)" title="Todo List Deactive" />
    </div>
  </main>
</template>

<script setup>
import Taskform from '@/components/Taskform.vue';
import TaskList from '@/components/TaskList.vue';
import { reactive } from 'vue';

const tasks = reactive([]);

const addTask = (task) => {
  tasks.push(task);
};
</script>
