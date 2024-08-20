<script setup lang="ts">
import { computed, ref } from 'vue';
import Error404 from "./404.vue"
import Sidebar from '../components/Sidebar.vue';
import Home from './Home.vue';

// ROUTING
const routes: Record<string, any> = {
  "/": Home,
  "/quest": Home
}

const currentPath = ref<string>(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
  console.log(currentPath.value)
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Error404
})
//

</script>

<template>
  <!-- <h1>{{ currentPath }}</h1> -->
  <main class="flex flex-row items-center justify-center bg-slate-950 h-[100dvh]">
    <Sidebar/>
    <component 
    class="flex-1"
    :is="currentView"
    />
  </main>
</template>