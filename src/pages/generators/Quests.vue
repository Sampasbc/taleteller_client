<script setup lang="ts">
import { ref } from 'vue';
import { Settings2 } from 'lucide-vue-next';
import VueMarkdown from 'vue-markdown-render'
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
const mockResponse = ref("<h1>Quest: The Lost Temple of the Moon Goddess</h1> <p>The village of Oakwood, nestled at the edge of a vast and mysterious forest, has long revered the ancient Temple of Selûne. This sacred site, hidden deep within the woods, is said to contain powerful relics and artifacts that hold the secrets of the moon goddess.</p> <h2>Background</h2> <table> <tr> <th>Name</th> <th>HP</th> <th>Initiative</th> <th>Speed</th> </tr> <tr> <td>Moonforged Entity</td> <td>250</td> <td>+6</td> <td>30 ft.</td> </tr> <tr> <td>Lunar Rays (3)</td> <td>N/A</td> <td>+4 each</td> <td>-</td> </tr> </table> <p>For generations, the villagers have maintained a delicate balance with the temple's guardians, a reclusive order of druids sworn to protect the temple and its treasures. However, as the years passed, strange occurrences began to plague Oakwood: crops withering, livestock falling ill, and the villagers themselves becoming increasingly restless.</p> <p>The villagers believe that the source of these troubles lies within the Temple of Selûne, where a dark force has begun to stir. They seek brave adventurers to explore the temple, put an end to whatever evil is brewing, and restore balance to their beloved village.</p> <h2>Quest Objectives</h2> <ul> <li>Investigate the source of the troubles in Oakwood and determine its connection to the Temple of Selûne.</li> <li>Explore the lost temple, navigating its treacherous traps and overcoming any challenges that lie within.</li> <li>Find a way to stop the dark force growing in power within the temple and restore peace to the village.</li> </ul> <h2>Reward</h2> <p>The people of Oakwood are willing to offer a generous reward to those who can resolve this issue:</p> <ul> <li>A magical amulet imbued with the power of Selûne, granting the wearer resistance to darkness and illusions.</li> <li>Access to the village's treasured library, containing ancient texts and forbidden knowledge.</li> <li>The gratitude of the villagers, who will forever remain in debt to those who have saved them from destruction.</li> </ul> <h2>Encounter: The Temple Entrance</h2> <p>A massive stone door adorned with intricate carvings and a glowing crescent moon welcomes adventurers to the entrance of the lost temple. As they approach, the air grows thick with an otherworldly energy.</p> <h3><strong>Temple Entrance Encounter (Any Size)</strong></h3> <table> <tr> <th>Name</th> <th>HP</th> <th>Initiative</th> <th>Speed</th> </tr> <tr> <td>Guardian Treant</td> <td>150</td> <td>+5</td> <td>30 ft.</td> </tr> <tr> <td>Moonwhisper Wraiths (3)</td> <td>50 each</td> <td>+2 each</td> <td>20 ft.</td> </tr> </table> <p><i>The Guardian Treant is a sentient tree with abilities tied to the lunar cycle. It seeks to protect the temple and its secrets from intruders. The Moonwhisper Wraiths are ethereal beings drawn to the moon's power, seeking to aid or hinder adventurers depending on their intentions.</i></p> <h2>Encounter: The Hall of Whispers</h2> <p>A labyrinthine corridor filled with whispering echoes and cryptic messages leads adventurers deeper into the temple. As they navigate this maze, they begin to uncover clues about the dark force growing in power within the temple.</p> <h3><strong>The Hall of Whispers Encounter (Any Size)</strong></h3> <table> <tr> <th>Name</th> <th>HP</th> <th>Initiative</th> <th>Speed</th> </tr> <tr> <td>Spectral Scribes (5)</td> <td>20 each</td> <td>+3 each</td> <td>10 ft.</td> </tr> <tr> <td>Shadowy Illusions</td> <td>N/A</td> <td>+1</td> <td>-</td> </tr> </table> <p><i>The Spectral Scribes are ghostly messengers, each carrying a unique and cryptic message that holds the key to understanding the temple's secrets. The Shadowy Illusions appear as dark, formless shapes that can deceive even the most perceptive adventurers.</i></p> <h2>Encounter: The Heart of the Temple</h2> <p>The final chamber of the temple contains a glowing crystal surrounded by an aura of darkness and malevolent energy. A powerful entity, born from the very essence of the moon goddess's power, has taken residence within this crystal.</p> <h3><strong>The Heart of the Temple Encounter (Any Size)</strong></h3> <table> <tr> <th>Name</th> <th>HP</th> <th>Initiative</th> <th>Speed</th> </tr> <tr> <td>Moonforged Entity</td> <td>250</td> <td>+6</td> <td>30 ft.</td> </tr> <tr> <td>Lunar Rays (3)</td> <td>N/A</td> <td>+4 each</td> <td>-</td> </tr> </table> <p><i>The Moonforged Entity is a powerful, otherworldly being born from the moon's power. It seeks to reclaim its lost essence and bring balance to the temple and the world beyond.</i></p> <h2>Additional Notes</h2> <p>As adventurers delve deeper into the temple, they will uncover clues about an ancient pact between the druids and a powerful organization that manipulated the village of Oakwood for their own gain. This revelation can lead to further adventures and complications if not handled carefully.</p> <p>The Temple of Selûne holds many secrets and mysteries waiting to be uncovered by brave adventurers willing to explore its depths.</p>")

const markdownOptions = {
  html: true
}

async function generateQuest() {

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

    <div id="generated-content" class="text-slate-200 overflow-auto">
      <!-- <div v-html="returnedResponse"></div> -->
      <vue-markdown :source="returnedResponse" :options="markdownOptions"/>
      <p class="text-slate-200">
      </p>
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
    margin: 1rem 0;
  }

  ::v-deep #generated-content h1::before {
    content: '______________';
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #94a3b8;
    margin: 1rem 0;
  }

  ::v-deep #generated-content h2 {
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 2rem 0 0rem;
  }
  
  ::v-deep #generated-content h2::after {
    content: '_______';
    letter-spacing: 0px;
    display: block;
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0rem 0 1rem;
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
    /* color: #cbd5e1;
    margin: 2rem 0;
    border: solid 1px #94a3b8;
    border-radius: 10rem; */

    /* border-collapse: separate;*/
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