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
                <button type="button" class="btn btn-link" v-if="authStore.isAuthenticated"  @click="logout">Đăng xuất</button>
            </div>
        </div>
    </nav>
</template>
<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { push } from 'notivue';
import { RouterLink } from 'vue-router';
const authStore = useAuthStore();
const logout = async () => {
    authStore.logout();
    push.warning('Đã đăng xuất')
    router.push({ name: "login" });
}
</script>
