<template>
  <div class="register">
    <form @submit.prevent="onSubmit" class="register__form">
      <h2 class="title text-center">Đăng ký</h2>
      <div class="mb-3">
        <label for="name" class="form-label">Tên hiển thị</label>
        <input type="text" class="form-control" id="name" v-model="formData.name">
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Tài khoản</label>
        <input type="text" class="form-control" id="username" v-model="formData.username">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu</label>
        <input type="password" class="form-control" id="password" v-model="formData.password">
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary d-block">Đăng ký</button>
        <RouterLink :to="{ name: 'login' }">
          Đăng nhập
        </RouterLink>
      </div>
    </form>
  </div>
</template>
<style>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.register__form {
  max-width: 500px;
  min-width: 400px;
}
</style>
<script setup>
import { reactive } from 'vue';
import authApi from '@/api/authApi'
import { push } from "notivue";
import router from '@/router';

const formData = reactive({
  name: '',
  username: '',
  password: ''
})

const onSubmit = async () => {
  const result = await authApi.register(formData)
  console.log(result);
  
  if (result) {
    push.success("Đăng ký tài khoản thành công!");
    router.push({ name: 'login' });
  }
}
</script>