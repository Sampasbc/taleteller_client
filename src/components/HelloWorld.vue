<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{ msg: string }>()
// defineProps<{Increse: () => void }>()
// defineProps<{Decrese: () => void }>()

const count = ref(0)

function Increase(max: number) {
  if(count.value >= max) {
    window.alert(`The maximum value is ${max}.`)
    return
  }
  count.value++
}

function Decrease(min: number) {
  if(count.value <= min){
    window.alert(`The minimum value is ${min}.`)
    return
  }
  count.value--
}

</script>

<template>
  <div class="space-y-3 flex flex-col items-center">
    <h1 class="font-inter text-2xl font-bold text-tt-primary">{{ count }}</h1>
    <div class="flex space-x-2">
      <button @click="Decrease(0)" class="text-tt-secondary-shade bg-tt-secondary px-5 py-[10px] rounded">Decrease</button>
      <button @click="Increase(10)" class="text-tt-secondary-shade bg-tt-secondary px-5 py-[10px] rounded">Increase</button>
    </div>
  </div>
</template>

<style scoped>
</style>
