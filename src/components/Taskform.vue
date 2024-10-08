<template>
  <form class="d-flex w-100" @submit.prevent="handleSubmit">
    <div class="w-100">
      <input type="text" class="form-control" v-model="task.name" placeholder="Task name">
      <span class="text-danger" v-if="txtErr">{{ txtErr }}</span>
    </div>
    <button type="submit" class="btn btn-success mx-2" style="height: fit-content;">Lưu</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const txtErr = ref('');

const emit = defineEmits(['add-task', 'update-task']);

const props = defineProps({
  tasks: Array,
  name: String,
  index: Number
})

const task = reactive({
  name: props.name ?? '',
  isActive: true,
  isEditing: false,
});

const handleSubmit = () => {
  console.log(props.index);

  if (validateData()) {
    if (props.index != undefined) {
      console.log('edit');

      emit('update-task', task.name, props.index)
    } else {

      console.log('create');

      emit('add-task', { ...task })
    }
    resetForm();
  }
};

const validateData = () => {
  txtErr.value = '';
  if (!task.name) {
    txtErr.value = "Task name không được để trống";
    return false;
  }

  if (props.tasks.some((i,index) => i.name === task.name && index != props.index && i.isActive)) {
    txtErr.value = "Task name đã tồn tại";
    return false;
  }
  return true;
};

const resetForm = () => {
  task.name = '';
};

</script>