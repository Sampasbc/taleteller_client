<script setup lang="ts">
import { computed, ref } from "vue";
import Dashboard from "./pages/Dashboard.vue";
import Home from "./pages/Home.vue"
import Error404 from "./pages/404.vue"

const routes: Record<string, any> = {
  "/": Home,
  "/dashboard": Dashboard,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Error404
})
</script>

<template>
  <component :is="currentView" />
</template>

<style scoped></style>
