<script setup lang="ts">
import { ArrowLeftFromLine, BookMarkedIcon, CompassIcon, DicesIcon, MenuIcon, UserCircle2Icon } from 'lucide-vue-next';
import { ref } from 'vue';

const isOpen = ref<boolean>(true)

function handleToggleSidebar() {
  isOpen.value = !isOpen.value
}

const navItemStyle = 'flex gap-2 items-center text-slate-300 text-heading-sm font-extralight hover:bg-slate-800 hover:outline hover:outline-4 outline-slate-800 rounded-sm'

</script>

<template>

  <div
    id="sidebar"
    :class="['flex flex-col justify-between items-center h-full pt-12 pb-6 bg-slate-900 border-r-2 border-r-slate-700',
    { 'w-72 min-w-72 px-6' : isOpen, 'w-20 min-w-20 px-3' : !isOpen }]">
    <div id="main_content" class="flex flex-col w-full space-y-12">

      <div id="heading" :class="['flex items-start justify-between', { 'flex-col items-center space-y-6': !isOpen}]">

        <div id="logo" :class="{'max-w-56' : isOpen, 'max-w-12' : !isOpen}">
          <img v-if="isOpen" src="../../public/TaleTeller_Logo.png" alt="">
          <img v-else src="../../public/TaleTeller_Icon.png" alt="">
        </div>
        <button @click="handleToggleSidebar" >
          <ArrowLeftFromLine v-if="isOpen" class="text-slate-200 hover:text-slate-400"/>
          <MenuIcon v-else class="text-slate-200 hover:text-slate-400"/>
        </button>

      </div>

      <div id="divider" class="w-full h-px bg-slate-500"></div>

      <div id="menu" class="space-y-6">
        <span v-if="isOpen" class="text-slate-500 text-heading-xm tracking-tight font-normal hover:cursor-default">Generators</span>
        <ul
          id="generators"
          :class="['flex flex-col space-y-3', { 'items-center':!isOpen}]">

          <li id="links">
            <a
              :class="navItemStyle" 
              href="#/quest">
               <CompassIcon stroke-width="1"/>
               <span v-if="isOpen" class="truncate">Quests</span>
            </a>
          </li>

          <li id="links">
            <a
              :class="navItemStyle"
              href="#/encounter">
               <DicesIcon stroke-width="1"/>
               <span v-if="isOpen" class="truncate">Encounters</span>
            </a>
          </li>

          <li id="links">
            <a
              :class="navItemStyle"
              href="#/npc">
               <UserCircle2Icon stroke-width="1"/>
               <span v-if="isOpen" class="truncate">NPCs</span>
            </a>
          </li>

          <li id="links">
            <a
              :class="navItemStyle" 
              href="#/campaign">
               <BookMarkedIcon stroke-width="1"/>
               <span v-if="isOpen" class="truncate">Campaign Scenarios</span>
            </a>
          </li>

        </ul>
      </div>
    </div>

    <div id="footer" class="w-full text-center">
      <p v-if="isOpen" class="text-slate-500 text-[0.625rem] font-normal">© TateTeller 2024 - All rights reserved.</p>
      <span class="text-slate-500 text-[0.625rem] font-normal">v0.0.1</span>
    </div>
  </div>

</template>

<style scope>
  #sidebar {
    transition: all 100ms ease;
  }
</style>