<template>
  <ul class="list-group">
    <template v-if="tasks.length">
      <li v-for="(task, index) in tasks" :key="task.id"
        class="list-group-item d-flex justify-content-between list-group-item-action content-task"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragover.prevent="onDragOver(index)"
        @drop="onDrop(index)">
        <template v-if="indexEdit === index">
          <Taskform :taskEdit="task" @update-task="updateTask" />
        </template>
        <template v-else>
          <div>
            <p class="m-0" style="max-width: 600px; word-wrap: break-word;">
              {{ task.title }}
            </p>
            <span class="badge text-bg-success mx-1">
              Ngày tạo: {{ new Date(task.createdAt).toLocaleDateString() }}
            </span>
            <span class="badge text-bg-danger mx-1">
              Ngày hết hạn: {{ task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Không có' }}
            </span>
            <span v-if="task.is_completed" class="badge text-bg-success mx-1">
              Đã hoàn thành
            </span>
          </div>
          <div class="d-flex align-items-center">
            <a class="mx-2" href="#" @click.prevent="toggleVisibility(task)"
              :class="{ 'text-secondary': !task.is_hidden }">
              <i :class="`fa-solid fa-eye${task.is_hidden ? '' : '-slash'}`"></i>
            </a>
            <a class="mx-2" href="#" @click.prevent="togglePin(task)" :class="{ 'text-secondary': !task.is_pinned }">
              <i :class="`fa-solid fa-thumbtack${task.is_pinned ? '' : '-slash'}`"></i>
            </a>
            <template v-if="!task.is_completed">
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
      <li class="list-group-item text-center">Chưa có dữ liệu</li>
    </template>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import Taskform from './Taskform.vue';
const emit = defineEmits(['update-task', 'delete-task', 'update-task-order']);

const indexEdit = ref(null); 

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const draggedIndex = ref(null);
const tasks = ref([...props.tasks]);

const onDragStart = (index) => {
  draggedIndex.value = index;
};

const onDragOver = (index) => {
  if (draggedIndex.value === index) return;

  const draggedTask = tasks.value[draggedIndex.value];
  
  tasks.value.splice(draggedIndex.value, 1);
  tasks.value.splice(index, 0, draggedTask); 
  
  draggedIndex.value = index; 
};

const onDrop = () => {
  const updatedTasks = tasks.value.map((task, idx) => ({
    ...task,
    order: idx + 1,
  }));
  
  emit('update-task-order', updatedTasks);
};

const updateTask = (data) => {
  indexEdit.value = null;
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
<style scoped>
.content-task {
  cursor: grab;
}
</style>