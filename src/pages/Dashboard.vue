<script setup lang="ts">
import { computed, ref } from 'vue';
import Error404 from "./404.vue"
import Sidebar from '../components/Sidebar.vue';
import Home from './Home.vue';
import Quests from './generators/Quests.vue';
import Encounters from './generators/Encounters.vue';
import NPCs from './generators/NPCs.vue'
import Campaigns from './generators/Campaigns.vue';

// ROUTING
const routes: Record<string, any> = {
  "/": Quests,
  "/quest": Quests,
  "/encounter": Encounters,
  "/npc": NPCs,
  "/campaign": Campaigns,
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
  <main class="flex flex-row items-center justify-start h-[100dvh] overflow-hidden">
    <Sidebar/>
    <div class="flex justify-center h-full w-full">
      <component 
        class="flex-1 max-w-[120rem]"
        :is="currentView"
      />
    </div>
  </main>
</template>