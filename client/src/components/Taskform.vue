<template>
  <form class="d-flex w-100" @submit.prevent="handleSubmit">

    <input type="text" class="form-control" v-model="task.title" placeholder="Nhập tiêu đề công việc" />
    <input type="date" class="form-control mx-2" v-model="task.due_date" />
    <span class="text-danger" v-if="txtErr">{{ txtErr }}</span>

    <button type="submit" class="btn btn-success mx-2"><i class="fa-solid fa-floppy-disk"></i></button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const txtErr = ref('');

const emit = defineEmits(['add-task', 'update-task']);

const props = defineProps({
  taskEdit: Object,
});

const task = ref({
  title: props.taskEdit?.title ?? '',
  due_date: props.taskEdit?.due_date ?? null,
});

watch(() => props.taskEdit, (newTaskEdit) => {
  task.value.title = newTaskEdit?.title ?? '';
  task.value.due_date = newTaskEdit?.due_date ?? null;
});

const handleSubmit = () => {
  if (props.taskEdit?.id) {
    emit('update-task', { id: props.taskEdit.id, ...task.value });
  } else {
    emit('add-task', { ...task.value });
  }
  resetForm();
};

const resetForm = () => {
  task.value = {
    title: '',
    due_date: null,
  };
};
</script>
