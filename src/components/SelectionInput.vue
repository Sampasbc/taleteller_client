<script setup lang="ts">
import { ref, Ref } from 'vue';

  interface Data {
    value: string,
    url?: string
  }

  const props = defineProps<{
    title: string
    updateController: (newValue: any) => void,
    data: Data[] | undefined,
    initialValue: Ref | object,
    optionLabel?: string,
    placeholder?: string,
    isEditable?: boolean,
    hasFilter?: boolean,
    hasShowClear?: boolean
  }>()
  
  const dataState = ref<object | undefined>({...props.initialValue})

  // :value="controller"
</script>

<template>
  <div class="flex flex-col space-y-1">
    <span class="text-slate-200 text-heading-xm font-light" >{{title}}</span>
    <Select
      v-model="dataState"
      @update:modelValue="(newValue) => updateController(newValue)"
      :options="data"
      :optionLabel="optionLabel || 'value'"
      :placeholder="placeholder"
      :editable="isEditable"
      :filter="hasFilter || true"
      :showClear="hasShowClear"
    >
      <template #value="data">
          <div class="flex items-center">
              <span v-if="data.value" class="text-heading-xm font-light text-slate-600">{{ data.value.value }}</span>
          </div>
      </template>
      <template #option="data">
          <div class="flex items-center space-x-3">
              <img v-if="data.option.url" :alt="data.option.value" :src="data.option.url" :class="`max-w-9 rounded`" />
              <span class="text-heading-xm text-slate-600 font-light">{{ data.option.value }}</span>
          </div>
      </template>
    </Select>
  </div>
</template>

<!-- <Select
  v-model="selectedLocation"
  :options="locationItems"
  optionLabel="name"
  placeholder="Select a Location"
  editable
  filter
  showClear
>
  <template #value="locationItems">
      <div class="flex items-center">
          <span class="text-heading-sm text-slate-600">{{ locationItems.value.name }}</span>
      </div>
  </template>
  <template #option="locationItems">
      <div class="flex items-center space-x-3">
          <img v-if="locationItems.option.url" :alt="locationItems.option.name" :src="locationItems.option.url" :class="`max-w-9 rounded`" />
          <span class="text-heading-sm text-slate-600">{{ locationItems.option.name }}</span>
      </div>
  </template>
</Select> -->