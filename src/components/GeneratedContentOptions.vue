<script setup lang="ts">
import { Copy, Save, Share2 } from 'lucide-vue-next';

const strokeWidth = 1
const buttonStyle = 'hover:bg-slate-800 hover:outline hover:outline-4 outline-slate-800 rounded-sm'

</script>

<template>
  <div class="flex space-x-2 text-slate-200">
    <button :class="buttonStyle">
      <Copy :stroke-width="strokeWidth"/>
    </button>
    <button :class="buttonStyle">
      <Save :stroke-width="strokeWidth"/>
    </button>
    <button :class="buttonStyle">
      <Share2 :stroke-width="strokeWidth"/>
    </button>
  </div>
</template>