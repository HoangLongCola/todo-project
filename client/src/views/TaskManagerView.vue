<template>
  <main class="d-flex justify-content-center mt-5">
    <div style="min-width: 800px;">
      <h2 class="text-center">QUẢN LÝ CÔNG VIỆC</h2>
      <div class="d-flex justify-content-between my-2">
        <span class="d-inline-flex gap-1">
          <a class="btn btn-success" data-bs-toggle="collapse" href="#showAddForm" role="button" aria-expanded="false"
            aria-controls="showAddForm">
            Thêm mới công việc
          </a>
        </span>
        <div class="d-flex">
          <span class="d-inline-flex gap-1">
            <a class="btn" @click="toggleFillter">
              <template v-if="enableFillter">
                <span class="mx-2">Huỷ lọc</span>
                <i class="fa-solid fa-filter-circle-xmark"></i>
              </template>
              <template v-else>
                <span class="mx-2">Lọc</span>
                <i class="fa-solid fa-filter"></i>
              </template>
            </a>
          </span>
          <div class="dropdown">
            <a class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ currentTab === 0 ? "Tất cả " : "Công việc đã ẩn" }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" :class="{ active: currentTab === 0 }" @click="changeTab(0)" href="#">
                  Tất cả
                </a>
              </li>
              <li>
                <a class="dropdown-item" :class="{ active: currentTab === 1 }" @click="changeTab(1)" href="#">
                  Công việc đã ẩn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="collapse my-2" id="showAddForm" style="min-width: 800px;">
        <div class="card card-body">
          <Taskform @add-task="addTask" />
        </div>
      </div>
      <div class="collapse" :class="enableFillter ? 'show' : ''" style="min-width: 800px;">
        <div class="card card-body">
          <div class="mb-3">
            <label for="name" class="form-label">Tên công việc</label>
            <input type="text" class="form-control" id="name" placeholder="Nhập tên công việc cần tìm" v-model="title"
              @input="loadData">
          </div>
          <div class="d-flex row">
            <div class="mb-3 col-6">
              <label for="startDate" class="form-label">Từ ngày</label>
              <input type="date" class="form-control" id="startDate" v-model="startDate" @change="loadData">
            </div>
            <div class="mb-3 col-6">
              <label for="endDate" class="form-label">Đến ngày</label>
              <input type="date" class="form-control" id="endDate" v-model="endDate" @change="loadData">
            </div>
          </div>
        </div>
      </div>
      <div class="my-2">
        <TaskList :tasks="tasks" @update-task="updateTask" @delete-task="deleteTask"
          @update-task-order="updateTaskOrder" />
      </div>
    </div>
    <template v-if="loadding">
      <div class="loading-overlay">
        <div class="spinner-border" role="status">
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
<script setup>
import Taskform from '@/components/Taskform.vue';
import TaskList from '@/components/TaskList.vue';
import { ref, onMounted } from 'vue';
import taskApi from '@/api/taskApi';
import { push } from 'notivue';

const tasks = ref([]);
const currentTab = ref(0);
const title = ref('');
const startDate = ref('');
const endDate = ref('');

const loadding = ref(false);
const enableFillter = ref(false);
onMounted(() => {
  loadData();
});

const toggleFillter = () => {
  enableFillter.value = !enableFillter.value
  if (!enableFillter.value) {
    title.value = '';
    startDate.value = '';
    endDate.value = '';
    loadData();
  }
}

const loadData = (mess = '', type = '', load = true) => {
  loadding.value = load;
  setTimeout(async () => {
    try {
      tasks.value = await taskApi.showList({
        isHidden: currentTab.value,
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value
      }) || [];
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    } finally {
      loadding.value = false;
      if (mess && type) push[type](mess);
    }
  }, 300)
}


const addTask = async (task) => {
  const response = await taskApi.create(task);
  if (response) {
    loadData('Đã thêm công việc', 'success');
  }
};

const updateTask = async (data, mess) => {
  const taskUpdate = await taskApi.update(data);
  const index = tasks.value.findIndex(i => i.id === taskUpdate.id);
  if (index !== -1) {
    loadData(mess ?? 'Đã cập nhật công việc', 'success');
  }
};

const deleteTask = async (id) => {
  const taskDelete = await taskApi.delete(id);
  if (taskDelete) {
    loadData('Đã xóa công việc', 'success');
  }
};

const updateTaskOrder = async (data) => {
  if (enableFillter.value) {
    push.warning('Đang ở chế độ lọc, những thay đổi vị trí của task sẽ không được lưu')
  } else {
    const taskUpdate = await taskApi.updateOrder(data);
    if (taskUpdate) {
      loadData('', '', false);
    }
  }
}

const changeTab = (tab) => {
  currentTab.value = tab;
  loadData();
};

</script>
