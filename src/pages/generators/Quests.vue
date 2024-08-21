<script setup lang="ts">
import { Settings2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { partySizeItems, locationItems, dificultyItems, durationItems } from '../../lib/selection-options'
import SelectionInput from '../../components/SelectionInput.vue'

const selectedPartySize = ref({...partySizeItems[0]})
const selectedLocation = ref({...locationItems[0]})
const selectedDificulty = ref({...dificultyItems[0]})
const selectedDuration = ref({...durationItems[0]})


function updateLocation(newValue: any) {
  selectedLocation.value = newValue
}

function updatePartySize(newValue: any) {
  selectedPartySize.value = newValue
}

function updateDificulty(newValue: any) {
  selectedDificulty.value = newValue
}

function updateDuration(newValue: any) {
  selectedDuration.value = newValue
}

</script>

<template>

  <div id="quest-generator" class="flex space-x-6 px-6 pb-6 pt-12">

    <div id="settings" class="flex flex-col gap-12 w-80">

      <div id="title" class="space-y-1">
        <h2 class="text-heading-lg font-medium text-slate-200">Quest Generator</h2>
        <span class="text-heading-xm font-normal text-slate-500">Create incredible quests on the fly.</span>
      </div>

      <div id="parameters" class="flex flex-col flex-1 justify-between space-y-6">

        <div id="parameters__title" class="flex space-x-2 items-center text-slate-200">
          <span class="text-heading-md font-medium">Parameters</span>
          <Settings2 stroke-width="1"/>
        </div>

        <div id="parameters__content" class="flex-1">
          <ul class="flex flex-col gap-6">

            <li>
              <SelectionInput
                title="Party Size"
                :initialValue="selectedPartySize"
                :data="partySizeItems"
                :updateController="updatePartySize"
              />
            </li>
            
            <li>
              <SelectionInput
                title="Location"
                :initialValue="selectedLocation"
                :data="locationItems"
                :updateController="updateLocation"
              />
              <!-- <span v-if="selectedLocation" class="text-slate-200">{{ selectedLocation.value }}</span> -->
            </li>
            
            <li>
              <SelectionInput
                title="Dificulty"
                :initialValue="selectedDificulty"
                :data="dificultyItems"
                :updateController="updateDificulty"
              />
            </li>
            
            <li>
              <SelectionInput
                title="Duration"
                :initialValue="selectedDuration"
                :data="durationItems"
                :updateController="updateDuration"
              />
            </li>

          </ul>

        </div>

        <div id="parameters__button" class="text-right">
          <button class="bg-tt-secondary text-tt-secondary-shade rounded text-button py-3 px-6 hover:bg-tt-secondary-hover">
            Generate Quest
          </button>
        </div>

      </div>
    </div>

    <div id="generated-content">

    </div>

  </div>

</template>