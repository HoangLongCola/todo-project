<template>
  <ul class="list-group">
    <template v-if="tasks.length">
      <li v-for="(task, index) in tasks" :key="task.id"
        class="list-group-item d-flex justify-content-between list-group-item-action content-task"
        :draggable="taskIdEdit == null ? true : false" @dragstart="onDragStart(index)"
        @dragover.prevent="onDragOver(index)" @drop="onDrop(index)" @dragend="onDragEnd(index)">
        <template v-if="taskIdEdit === task.id">
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
            <template v-if="!task.is_completed">
              <a class="mx-2 text-success" href="#" data-bs-toggle="modal" data-bs-target="#complete"
                @click.prevent="completeTask(task)">
                <i class="fa-solid fa-check"></i>
              </a>
              <a class="mx-2" href="#" @click.prevent="editTask(task.id)">
                <i class="fa-solid fa-pen"></i>
              </a>
              <a class="mx-2 text-danger" href="#" @click.prevent="deleteTask(task.id)">
                <i class="fa-solid fa-trash"></i>
              </a>
            </template>
            <a class="mx-2" href="#" @click.prevent="toggleVisibility(task)"
              :class="{ 'text-secondary': !task.is_hidden }">
              <i :class="`fa-solid fa-eye${task.is_hidden ? '' : '-slash'}`"></i>
            </a>
            <a class="mx-2" href="#" @click.prevent="togglePin(task)" :class="{ 'text-secondary': !task.is_pinned }">
              <i :class="`fa-solid fa-thumbtack${task.is_pinned ? '' : '-slash'}`"></i>
            </a>
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
import { computed, ref } from 'vue';
import Taskform from './Taskform.vue';
const emit = defineEmits(['update-task', 'delete-task', 'update-task-order']);

const taskIdEdit = ref(null);

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const tasks = computed(() => props.tasks);
const draggedIndex = ref(null);

const onDragStart = (index) => {
  draggedIndex.value = index;

  const items = document.querySelectorAll('.content-task');
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.add('dragging');
    }
  });
};

const onDragEnd = (index) => {
  const items = document.querySelectorAll('.content-task');
  items.forEach((item, i) => {
    item.classList.remove('dragging');
  });
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
  taskIdEdit.value = null;
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

const editTask = (taskId) => {
  taskIdEdit.value = taskId;
};

const deleteTask = (id) => {
  emit('delete-task', id);
};
</script>

<style scoped>
.list-group {
  padding: 10px;
  max-height: 740px;
  overflow-y: auto;
}
.content-task {
  cursor: grab;
  background-color: #ffffff;
  border: 2px solid #ddd;
  padding: 15px;
  margin: 5px 0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.content-task:active {
  cursor: grabbing;
}

.content-task.dragging {
  opacity: 0.7;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background-color: #e6f7ff;
}
</style>
