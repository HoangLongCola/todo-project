<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink :to="{ name: 'home' }" class="nav-link">TODO</RouterLink>
                    </li>
                </ul>
                <button type="button" class="btn btn-link"  @click="logout">Đăng xuất</button>
            </div>
        </div>
    </nav>
</template>
<script setup>
import router from '@/router';
import { RouterLink } from 'vue-router';

const logout = async () => {
    localStorage.removeItem('access_token');
    router.push({ name: "login" });
}
</script>
