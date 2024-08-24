<script setup lang="ts">
import { ref } from 'vue';
import { Settings2 } from 'lucide-vue-next';
import VueMarkdown from 'vue-markdown-render'
import SelectionInput from '../../components/SelectionInput.vue'
import Loader from '../../components/Loader.vue';
import GeneratedContentOptions from '../../components/GeneratedContentOptions.vue';
import NoContent from '../../components/NoContent.vue';
import { rpgSystemsData } from '../../lib/selection_data/rpg-systems'
import { locationsData } from '../../lib/selection_data/locations'
import { environmentsData } from '../../lib/selection_data/environments'
import { rpgRacesData } from '../../lib/selection_data/rpg-races'
import { partySizeData } from '../../lib/selection_data/party-size'
import { dificultiesData } from '../../lib/selection_data/dificulties'
import { durationsData } from '../../lib/selection_data/durations'
import { api } from '../../lib/axios';
import { mockResponse } from '../../lib/mockResponse'

const selectedRpgSystem = ref({...rpgSystemsData[0]})
const selectedLocation = ref({...locationsData[0]})
const selectedEnvironment = ref({...environmentsData[0]})
const selectedRace = ref({...rpgRacesData[0]})
const selectedPartySize = ref({...partySizeData[0]})
const selectedDificulty = ref({...dificultiesData[0]})
const selectedDuration = ref({...durationsData[0]})

const isLoading = ref<boolean>(false);

const returnedResponse = ref('')

const markdownOptions = {
  html: true
}

async function generateQuest() {

  // returnedResponse.value = ''
  isLoading.value = true;
  
  try{
    const response = await api.post('/quest/generate', {
      rpgSystem: selectedRpgSystem.value.value,
      giverLocation : selectedLocation.value.value,
      questLocation: selectedEnvironment.value.value,
      regionRace: selectedRace.value.value,
      partySize: selectedPartySize.value.value,
      dificulty: selectedDificulty.value.value,
      duration: selectedDuration.value.value
    })
    
    returnedResponse.value = response.data.response
    console.log(response.data)
    if(response.status !== 200) {
      throw new Error('Connection Error.')
    }
  } catch (error){
    console.log(error)
    window.alert(error)
  } finally {
    isLoading.value = false;
  }

}

function updateRpgSystem(newValue: any) {
  selectedRpgSystem.value = newValue
}

function updateLocation(newValue: any) {
  selectedLocation.value = newValue
}

function updateEnvironment(newValue: any) {
  selectedEnvironment.value = newValue
}

function updateRace(newValue: any) {
  selectedRace.value = newValue
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

  <div id="quest-generator" class="flex flex-col max-h-full px-6 pb-6 pt-12 space-y-12">

    <div id="title" class="space-y-1">
      <h2 class="text-heading-lg font-medium text-slate-200">Quest Generator</h2>
      <span class="text-heading-xm font-normal text-slate-500">Create incredible quests on the fly.</span>
    </div>

    <div id="main-content" class="flex h-full space-x-6 overflow-hidden">

      <div id="parameters" class="flex flex-col flex-1 space-y-6 max-w-72">

        <div id="parameters__title" class="flex space-x-2 items-center text-slate-200">
          <span class="text-heading-md font-medium">Parameters</span>
          <Settings2 stroke-width="1"/>
        </div>

        <div id="parameters__content" :class="['flex-1 transition-opacity', { 'opacity-50 hover:opacity-100':returnedResponse }]">
          <ul class="flex flex-col gap-4">

            <li>
              <SelectionInput
                title="RPG System"
                :initialValue="selectedRpgSystem"
                :data="rpgSystemsData"
                :updateController="updateRpgSystem"
              />
            </li>

            <li>
              <SelectionInput
                title="Quest Giver Location"
                :initialValue="selectedLocation"
                :data="locationsData"
                :updateController="updateLocation"
              />
            </li>
            
            <li>
              <SelectionInput
                title="Quest Environment"
                :initialValue="selectedEnvironment"
                :data="environmentsData"
                :updateController="updateEnvironment"
              />
              <!-- <span v-if="selectedLocation" class="text-slate-200">{{ selectedLocation.value }}</span> -->
            </li>

            <li>
              <SelectionInput
                title="Region's Main Race"
                :initialValue="selectedRace"
                :data="rpgRacesData"
                :updateController="updateRace"
              />
            </li>

            <li>
              <SelectionInput
                title="Party Size"
                :initialValue="selectedPartySize"
                :data="partySizeData"
                :updateController="updatePartySize"
              />
            </li>
            
            <li>
              <SelectionInput
                title="Dificulty"
                :initialValue="selectedDificulty"
                :data="dificultiesData"
                :updateController="updateDificulty"
              />
            </li>
            
            <li>
              <SelectionInput
                title="Duration"
                :initialValue="selectedDuration"
                :data="durationsData"
                :updateController="updateDuration"
              />
            </li>

          </ul>

        </div>

        <div id="parameters__button" class="text-right mt-auto">
          <button
            @click="generateQuest"
            :disabled="isLoading"
            :class="['bg-tt-secondary text-tt-secondary-shade rounded text-button py-3 px-6 hover:bg-tt-secondary-hover',
              {'bg-tt-secondary-hover text-tt-secondary-shade hover:bg-tt-secondary-hover': isLoading}
            ]">
            Generate Quest
          </button>
        </div>

      </div>
  
      <div id="generated-content"
        :class="['flex-1 flex flex-col space-y-3 text-slate-200',
        {'justify-center items-center': !returnedResponse || isLoading}]"
      >
  
        <div v-if="isLoading" class="absolute top-1/2 -translate-y-1/2">
          <Loader/>
        </div>

        <div v-if="!isLoading && returnedResponse" class="ml-auto pt-1 pr-3 fade-in">
          <GeneratedContentOptions/>
        </div>
  
        <div v-if="returnedResponse && !isLoading" class="fade-in pr-3 overflow-auto">
          <vue-markdown
            :source="returnedResponse"
            :options="markdownOptions"
          />
        </div>

        <div v-if="!returnedResponse && !isLoading" class="fade-in absolute top-1/2 -translate-y-1/2">
          <NoContent/>
        </div>
  
      </div>

    </div>

  </div>
  
</template>

<style scoped>

  ::v-deep #generated-content {
    font-family: Inter, sans-serif;
  }
  ::v-deep #generated-content h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
    color: #e2e8f0;
  }

  ::v-deep #generated-content h1::after {
    content: '____________________';
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #94a3b8;
    margin: 0rem 0 2rem;
  }

  ::v-deep #generated-content h2 {
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 2rem 0 0rem;
  }
  
  ::v-deep #generated-content h2::after {
    content: '__________';
    display: block;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0px;
    margin: 0rem 0 1rem;
    color: #94a3b8;
  }
  
  ::v-deep #generated-content h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 1rem 0 1rem;
  }

  ::v-deep #generated-content p {
    margin: .5rem 0;
    font-weight: 300;
    color: #cbd5e1;
  }

  ::v-deep #generated-content table {
    
    /* border-collapse: separate;*/
    margin: 2rem 0;
    border-spacing: 0; /* Removes spacing between cells */
    border-radius: 4px; /* Adjust radius as needed */
    overflow: hidden; /* Ensures content inside respects border radius */
    border: 1px solid #ddd;
  }

  ::v-deep #generated-content tbody {
    border-radius: 10rem;
  }
  
  ::v-deep #generated-content tr {
    color: #cbd5e1;
    margin: .5rem 0;
    padding: 1rem;
  }

  ::v-deep #generated-content th {
    margin: .5rem 0;
    padding: .5rem 1rem;
    color: #cbd5e1;
    background-color: #94a3b830;
    border: solid 1px #94a3b8;
    border-bottom: solid 3px #94a3b8;
  }
  
  ::v-deep #generated-content td {
    margin: .5rem 0;
    padding: .5rem 1rem;
    color: #cbd5e1;
    background-color: #94a3b818;
    border: solid 1px #94a3b8;
  }

  ::v-deep #generated-content ul {
    list-style: circle;
    list-style-type: disc;
    /* color: red; */
    color: #cbd5e1;
  }

  ::v-deep #generated-content ul li::before{
    content: '- ';
    /* color: red; */
    color: #94a3b8;
  }

  ::v-deep #generated-content ul li{
    margin: .75rem 0;
  }

</style>