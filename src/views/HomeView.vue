<template>
  <main class="d-flex justify-content-center mt-5">
    <div style="width: 500px;">
      <Taskform :tasks="tasks" @add-task="addTask" />

      <TaskList :tasks="tasks.filter(i => i.isActive || i.isEditing)" title="Todo List Active" />

      <TaskList :tasks="tasks.filter(i => !i.isActive)" title="Todo list Deactive" />
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
