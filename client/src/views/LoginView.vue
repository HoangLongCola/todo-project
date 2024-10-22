<template>
    <div class="login">
        <form @submit.prevent="onSubmit" class="login__form">
            <h2 class="title text-center">Đăng nhập</h2>
            <div class="mb-3">
                <label for="username" class="form-label">Tài khoản</label>
                <input type="text" class="form-control" id="username" v-model="formData.username">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <input type="password" class="form-control" id="password" v-model="formData.password">
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary d-block">Đăng nhập</button>
                <RouterLink :to="{ name: 'register' }">
                    Đăng ký
                </RouterLink>
            </div>
        </form>
    </div>
</template>
<style>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}

.login__form {
    max-width: 500px;
    min-width: 400px;
}

.flex-dicoration {
    display: flex;
    flex-direction: column;
}
</style>
<script setup>
import router from '@/router';
import { reactive } from 'vue';
import authApi from '@/api/authApi'
import { push } from "notivue";

const formData = reactive({
    username: '',
    password: ''
})

const onSubmit = async () => {
    const response = await authApi.login(formData);

    if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        push.success(`Chào ${response.data.name}!`)
        router.push({ name: "home" });
    }
}
</script>