<script setup lang="ts">
import { computed, ref } from 'vue';
import Error404 from "./404.vue"
import Sidebar from '../components/Sidebar.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes: Record<string, any> = {
  "#/dashboard/hello": HelloWorld,
  "/dashboard": "Dashboard",
}

const currentPath = ref<string>(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Error404
})
</script>

<template>
  <main class="flex flex-col items-center justify-center bg-slate-900 h-[100dvh]">
    <Sidebar/>
    <component :is="currentView"/>
    <h1>{{ currentPath }}</h1>
  </main>
</template>