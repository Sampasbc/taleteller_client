<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const isTakingLong = ref<boolean>(false);

onMounted(() => {
  setTimeout(() => isTakingLong.value = true, 5000);
})

</script>

<template>
  <div class="flex flex-col items-center relative fade-in">
    <Loader2 stroke-width="0.4" class="size-20 loading"/>
    <span v-if="isTakingLong" class="absolute w-[400px] text-slate-400 text-center -bottom-10 fade-in" >Please be patient, this might take a while...</span>
  </div>

</template>