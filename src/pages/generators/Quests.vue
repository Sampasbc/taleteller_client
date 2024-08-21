<script setup lang="ts">
import { Settings2 } from 'lucide-vue-next';
import { ref } from 'vue';
import SelectionInput from '../../components/SelectionInput.vue'
import { rpgSystemsData } from '../../lib/selection_data/rpg-systems'
import { locationsData } from '../../lib/selection_data/locations'
import { environmentsData } from '../../lib/selection_data/environments'
import { rpgRacesData } from '../../lib/selection_data/rpg-races'
import { partySizeData } from '../../lib/selection_data/party-size'
import { dificultiesData } from '../../lib/selection_data/dificulties'
import { durationsData } from '../../lib/selection_data/durations'
import { api } from '../../lib/axios';

const selectedRpgSystem = ref({...rpgSystemsData[0]})
const selectedLocation = ref({...locationsData[0]})
const selectedEnvironment = ref({...environmentsData[0]})
const selectedRace = ref({...rpgRacesData[0]})
const selectedPartySize = ref({...partySizeData[0]})
const selectedDificulty = ref({...dificultiesData[0]})
const selectedDuration = ref({...durationsData[0]})

const returnedResponse = ref('')
const mockResponse = ref(
  "**Quest: The Missing Heirloom of Oakwood** **Location:** Oakwood Inn, a cozy tavern in the heart of Oakwood Village, a bustling hub of commerce and trade controlled mainly by humans. **Environment:** A warm summer evening, with a gentle breeze carrying the scent of freshly baked bread and roasting meats from the nearby market stalls. The sun has just set, casting a golden glow over the village square. **Quest Summary:** The party is approached by Elara Moonwhisper, a kind-hearted human innkeeper at Oakwood Inn. She's frantic because her family's heirloom, a priceless silver locket passed down through generations, has gone missing. The locket was last seen during a family gathering in the inn's common room. Elara begs the party to find the locket and return it before her family's reputation is tarnished. **Quest Objectives:** * Find the missing heirloom * Return the locket to Elara Moonwhisper within 24 hours **Rewards:** * A generous reward of 100 gold pieces from Elara * The gratitude of the Moonwhisper family, potentially leading to future favors and connections in Oakwood Village --- **Encounter 1: The Suspicious Tavern Patron (CR 1/4)** As the party begins investigating the missing heirloom, they notice a shady-looking individual lingering around the tavern's common room. This encounter takes place within 10 minutes of starting the quest. * **Name:** Grimbold Ironfist * **Appearance:** A burly dwarf with a thick beard and a black leather apron. * **Behavior:** Grimbold seems nervous, constantly glancing over his shoulder as if waiting for someone or something to arrive. He's been sipping ale at the bar since the party arrived. * **Intentions:** Grimbold is a fence who sold the locket on the black market. He's trying to avoid detection and escape with the profit. --- **Encounter 2: The Moonwhisper Family (CR N/A)** Upon finding the locket, the party must return it to Elara Moonwhisper within the time limit specified in the quest objectives. * **Name:** Elara Moonwhisper * **Appearance:** A middle-aged human woman with a warm smile and an air of dignity. * **Behavior:** Elara is visibly relieved when her heirloom is returned. She thanks the party profusely, offering them the reward and expressing her gratitude. * **Intentions:** Elara genuinely appreciates the party's help in recovering her family's treasured heirloom. --- **Optional Encounter: The Black Market Fencers (CR 3-5)** If Grimbold Ironfist is encountered first, he might lead the party to a black market for thieves and fences. This encounter takes place within 2 hours of starting the quest, depending on how quickly the party can track down Grimbold. * **Name:** The Black Market Fencers * **Appearance:** A group of shady characters haggling over stolen goods in a seedy alleyway. * **Behavior:** The fencers are aggressive and territorial, defending their illicit market from would-be buyers and sellers. * **Intentions:** The black market fencers are trying to protect their operation and interests. They might attempt to intimidate or bribe the party into leaving them alone. --- This quest is designed for Any Size players, with a difficulty level that will challenge and engage them. The location, environment, and quest objectives provide a rich backdrop for adventure, while the encounters offer a mix of combat, social interaction, and problem-solving.")

async function generateQuest() {

  try{
    const response = await api.post('/quest/generate', {
      numOfPlayers: selectedPartySize.value.value,
      receiveLocation : selectedLocation.value.value,
      regionRace: selectedRace.value.value,
      questLocation: selectedEnvironment.value.value,
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

  <div id="quest-generator" class="flex space-x-6 px-6 pb-6 pt-12">

    <div id="settings" class="flex flex-col gap-12 min-w-80">

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

        <div id="parameters__button" class="text-right">
          <button @click="generateQuest" class="bg-tt-secondary text-tt-secondary-shade rounded text-button py-3 px-6 hover:bg-tt-secondary-hover">
            Generate Quest
          </button>
        </div>

      </div>
    </div>

    <div id="generated-content" class="text-slate-200">
      <p class="text-slate-200">
        {{ mockResponse }}
      </p>
    </div>

  </div>

</template>