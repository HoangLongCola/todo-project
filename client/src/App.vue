<script setup lang="ts">
import { Notification, Notivue } from 'notivue';
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <div class="container">
    <RouterView />
  </div>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>