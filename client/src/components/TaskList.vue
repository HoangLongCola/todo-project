<template>
  <div class="my-3">
    <ul class="list-group">
      <template v-if="tasks.length">
        <li v-for="(task, index) in tasks" :key="task.id" class="list-group-item d-flex justify-content-between">
          <template v-if="indexEdit === index">
            <Taskform :taskEdit="task" @update-task="updateTask" />
          </template>
          <template v-else>
            <div>
              <p class="m-0" style="max-width: 600px; word-wrap: break-word;">
                {{ task.title }}
              </p>
              <span class="text-muted">
                Ngày tạo: {{ new Date(task.createdAt).toLocaleDateString() }}
              </span>
              |
              <span class="text-muted">
                Ngày hết hạn: {{ task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Không có' }}
              </span>
            </div>
            <div class="d-flex align-items-center">
              <span v-if="task.is_completed" class="badge text-bg-success">
                Đã hoàn thành
              </span>
              <template v-else>
                <a class="mx-2" href="#" @click.prevent="toggleVisibility(task)"
                  :class="{ 'text-secondary': !task.is_hidden }">
                  <i :class="`fa-solid fa-eye${task.is_hidden ? '' : '-slash'}`"></i>
                </a>
                <a class="mx-2" href="#" @click.prevent="togglePin(task)"
                  :class="{ 'text-secondary': !task.is_pinned }">
                  <i :class="`fa-solid fa-thumbtack${task.is_pinned ? '' : '-slash'}`"></i>
                </a>
                <a class="mx-2 text-success" href="#" @click.prevent="completeTask(task)">
                  <i class="fa-solid fa-check"></i>
                </a>
                <a class="mx-2" href="#" @click.prevent="editTask(index)">
                  <i class="fa-solid fa-pen"></i>
                </a>
                <a class="mx-2 text-danger" href="#" @click.prevent="deleteTask(task.id)">
                  <i class="fa-solid fa-trash"></i>
                </a>
              </template>
            </div>
          </template>
        </li>
      </template>
      <template v-else>
        <li class="list-group-item">Chưa có dữ liệu</li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Taskform from './Taskform.vue';

const emit = defineEmits(['update-task', 'delete-task']);

const indexEdit = ref('');

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const updateTask = (data) => {
  indexEdit.value = '';
  emit('update-task', data);
};

const toggleVisibility = (task) => {
  emit('update-task', { ...task, is_hidden: !task.is_hidden }, task.is_hidden ? "Bỏ ẩn công việc" : "Ẩn công việc");
};

const togglePin = (task) => {
  emit('update-task', { ...task, is_pinned: !task.is_pinned }, task.is_pinned ? "Bỏ ghim công việc" : "Ghim công việc");
};

const completeTask = (task) => {
  emit('update-task', { ...task, is_completed: !task.is_completed }, "Hoàn thành công việc");
};

const editTask = (index) => {
  indexEdit.value = index;
};

const deleteTask = (id) => {
  emit('delete-task', id);
};
</script>
