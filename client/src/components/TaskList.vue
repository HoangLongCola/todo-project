<template>
  <div class="my-3">
    <div class="list-title d-flex">
      <h3>{{ title }}</h3>
      <p><span class="badge text-bg-success mx-2">{{ countTask }}</span></p>
    </div>
    <ul class="list-group">
      <template v-if="countTask > 0" v-for="(item, index) in tasks" :key="index">
        <li class="list-group-item d-flex justify-content-between">
          <template v-if="item.isEditing">
            <Taskform :tasks="tasks" :name="item.name" :index="index" @update-task="updateTask" />
          </template>

          <template v-else>
            <span :class="item.isActive ? '' : 'text-decoration-line-through'">{{ item.name }}</span>
            <div class="d-flex" v-if="item.isActive">
              <button @click="editTask(index)" class="btn btn-primary mx-1">Save</button>
              <button @click="deleteTask(index)" class="btn btn-danger mx-1">Delete</button>
            </div>
          </template>
        </li>
      </template>
      <template v-else>
        <li class="list-group-item">
          No data
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Taskform from './Taskform.vue';

const props = defineProps({
  tasks: Array,
  title: String
});

const countTask = computed(() => props.tasks.length)

const updateTask = (name, index) => {
  props.tasks[index].name = name;
  props.tasks[index].isEditing = false;
};

const editTask = (index) => props.tasks[index].isEditing = true;
const deleteTask = (index) => props.tasks[index].isActive = false;;
</script>