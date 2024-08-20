<script setup lang="ts">
import { computed, ref } from 'vue';
import Error404 from "./404.vue"
import Sidebar from '../components/Sidebar.vue';
import Home from './Home.vue';

const routes: Record<string, any> = {
  "/": Home,
  "/home": Home
}

const currentPath = ref<string>(window.location.pathname)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.pathname
  console.log(currentPath.value)
})

const currentView = computed(() => {
  return routes[currentPath.value || '/'] || Error404
})
</script>

<template>
  <!-- <h1>{{ currentPath }}</h1> -->
  <main class="flex flex-row items-center justify-center bg-slate-950 h-[100dvh]">
    <Sidebar/>
    <component 
    :is="currentView"
    class="flex-1"
    />
  </main>
</template>