<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/sidebar/Sidebar.vue'
import { sidebarWidth } from './components/sidebar/state'
</script>

<template>
  <Header />
  <Sidebar />
  <Toast />
  <div :style="{ 'margin-left' : sidebarWidth, 'margin-top' : '55px' }">
    <RouterView />
  </div>
  <Footer />
</template>

<style scoped>

</style>
