<template>
  <div class="my-3">
    <h3>{{ title }}</h3>
    <ul class="list-group">
      <template v-for="(item, index) in tasks" :key="index">
        <li class="list-group-item d-flex justify-content-between">
          <template v-if="item.isEditing">
            <Taskform :tasks="tasks" :name="item.name" :index="index" @update-task="updateTask" />
          </template>

          <template v-else>
            <span :class="item.isActive ? '' : 'text-decoration-line-through'">{{ item.name }}</span>
            <div class="d-flex" v-if="item.isActive">
              <button @click="editTask(index)" class="btn btn-primary mx-1">Sửa</button>
              <button @click="deleteTask(index)" class="btn btn-danger mx-1">Xóa</button>
            </div>
          </template>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import Taskform from './Taskform.vue';

const props = defineProps({
  tasks: Array,
  title: String
});

const updateTask = (name, index) => {
  props.tasks[index].name = name;
  props.tasks[index].isEditing = false;
};

const editTask = (index) => props.tasks[index].isEditing = true;
const deleteTask = (index) => props.tasks[index].isActive = false;;
</script>