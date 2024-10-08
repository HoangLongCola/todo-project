<template>
  <main class="d-flex justify-content-center mt-5">
    <div style="width: 500px;">
      <form class="d-flex" @submit.prevent="handleSubmit">
        <div class="w-100">
          <input type="text" class="form-control" name="name" v-model="name" placeholder="Task name">
          <p class="text-danger" v-if="txtErr">{{ txtErr }}</p>
        </div>
        <button type="submit" class="btn btn-success mx-2" style="height: fit-content;">Lưu</button>
      </form>

      <div class="my-5">
        <h3>Todo list Active</h3>
        <ul class="list-group">
          <template v-for="(item, index) in items" :key="index">
            <li class="list-group-item d-flex justify-content-between" v-if="item.status !== 'deactive'">
              <input type="text" v-if="item.status === 'edit'" class="form-control" v-model="item.name"
                placeholder="Task name">
              <span v-else class="text-break">{{ item.name }}</span>
              <div class="d-flex" style="height: fit-content;">
                <button type="button" @click="updateTask(item, index)" v-if="item.status === 'edit'"
                  class="btn btn-success mx-1">Lưu</button>
                <button type="button" @click="editTask(item)" v-else class="btn btn-primary mx-1">Sửa</button>
                <button type="button" @click="deleteTask(item)" class="btn btn-danger">Xóa</button>
              </div>
            </li>
          </template>
        </ul>
      </div>

      <div class="my-5">
        <h3>Todo list Deactive</h3>
        <ul class="list-group">
          <template v-for="item in items" :key="item.name">
            <li class="list-group-item text-decoration-line-through" v-if="item.status === 'deactive'">
              <span class="text-break">{{ item.name }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue';

const items = reactive([]);
const name = ref('');
const txtErr = ref('');

function handleSubmit() {
  if (validateData(name.value)) {
    addTask({ name: name.value, status: 'active' });
    resetForm();
  }
}

const validateData = (name) => {
  txtErr.value = '';
  if (!name) {
    txtErr.value = "Task name không được để trống";
    return false;
  }

  const exists = items.some(item => item.name === name);
  if (exists) {
    txtErr.value = "Task name đã tồn tại";
    return false;
  }

  return true;
}

const addTask = (item) => { items.push(item); }

const editTask = (item) => {
  item.status = 'edit';
}

const updateTask = (item, index) => {
  items[index].status = 'active';
}

const deleteTask = (item) => {
  const task = items.find(i => i.name === item.name);
  if (task) {
    task.status = 'deactive';
  }
}

const resetForm = () => {
  name.value = '';
  txtErr.value = '';
}
</script>
