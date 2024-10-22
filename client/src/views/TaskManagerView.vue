<template>
  <main class="d-flex justify-content-center mt-5">
    <div style="width: 800px;">
      <h2 class="text-center my-2">QUẢN LÝ CÔNG VIỆC</h2>
      <Taskform @add-task="addTask" />

      <TaskList :tasks="tasks" @update-task="updateTask" @delete-task="deleteTask" />
    </div>
  </main>
</template>

<script setup>
import Taskform from '@/components/Taskform.vue';
import TaskList from '@/components/TaskList.vue';
import { ref, onMounted } from 'vue';
import taskApi from '@/api/taskApi';
import { push } from 'notivue';

const tasks = ref([]);

onMounted(() => {
  loadData();
});

const loadData = async () => {
  tasks.value = (await taskApi.showList()) || [];
};

const addTask = async (task) => {
  const response = await taskApi.create(task);
  loadData();
  if(response){
    push.success('Đã thêm công việc'); 
  }
};

const updateTask = async (data, mess) => {
  const taskUpdate = await taskApi.update(data);
  loadData();
  const index = tasks.value.findIndex(i => i.id === taskUpdate.id);
  if (index !== -1) {
    push.success(mess ?? 'Đã cập nhật công việc');
  }
};

const deleteTask = async (id) => {
  const taskDelete = await taskApi.delete(id);
  loadData();
  if (taskDelete) {
    push.success('Đã xóa công việc');
  }
};
</script>
