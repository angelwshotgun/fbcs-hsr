<template>
  <div v-if="!props.isLightCone" class="w-full flex flex-col">
    <div class="relative w-full h-[100px] flex flex-col justify-center items-center overflow-hidden">
      <NuxtImg
        v-if="char"
        :src="link + model?.img"
        :style="props.isBan ? 'filter: grayscale(100%);' : ''"
        class="object-contain w-30% h-auto"
        @click="char = null"
      />
      <Select
        v-else
        v-model="char"
        :options="characters"
        option-label="name"
        filter
        placeholder="Chọn nhân vật"
        class="w-1/2"
        @change="props.isBan ? banCharacter() : selectCharacter()"
      />
      <label v-if="!props.isBan" class="absolute top-0 right-0 m-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm">{{ "+ " + (model1?.point[eiloidon] + (lc?.point[superimp] || 0)) }}</label>
    </div>
    <div v-if="!props.isBan" class="grid grid-cols-6 w-full">
      <Select
        v-model="eiloidon"
        :options="eiloidonSelect"
        option-label="label"
        option-value="value"
        filter
        class="col-span-1"
      />
      <Select
        v-model="lc"
        :options="light_cones"
        option-label="name"
        filter
        placeholder="Chọn nón ánh sáng"
        class="col-span-4"
      />
      <Select
        v-model="superimp"
        :options="superimpSelect"
        option-label="label"
        option-value="value"
        filter
        class="col-span-1"
      />
    </div>
  </div>
  <div v-else class="w-full flex flex-col">
    <div class="w-full h-[100px] flex flex-col justify-center items-center overflow-hidden">
      <NuxtImg
        v-if="lc"
        :src="link + lc.preview"
        :style="props.isBan ? 'filter: grayscale(100%);' : ''"
        class="object-contain w-20% h-auto"
        @click="lc = null"
      />
      <Select
        v-else
        v-model="lc"
        :options="light_cones"
        option-label="name"
        filter
        placeholder="Chọn nón ánh sáng"
        class="w-1/2"
        @change="banLightcone()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/useStore";

const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const characters = ref();
const light_cones = ref();
const char = ref()
const lc = ref()
const eiloidon = ref<number>(0);
const superimp = ref<number>(1); 
const eiloidonSelect = ref(
  [
    { label: 'c0', value: 0 },
    { label: 'c1', value: 1 },
    { label: 'c2', value: 2 },
    { label: 'c3', value: 3 },
    { label: 'c4', value: 4 },
    { label: 'c5', value: 5 },
    { label: 'c6', value: 6 },
  ]
)
const superimpSelect = ref(
  [
    { label: 's1', value: 0 },
    { label: 's2', value: 1 },
    { label: 's3', value: 2 },
    { label: 's4', value: 3 },
    { label: 's5', value: 4 },
  ]
)

fetch("https://fbcs-hsr.vercel.app/api/characters")
  .then((res) => res.json())
  .then((data) => {
    characters.value = Object.values(data);
  });

fetch("https://fbcs-hsr.vercel.app/api/light_cones")
  .then((res) => res.json())
  .then((data) => {
    light_cones.value = Object.values(data);
  });

const props = defineProps({
  isBan: Boolean,
  isLightCone: Boolean,
  state: String,
  bp: String,
  lcstate: String,
  index: Number,
  team: String
})

const model = computed(() => {
  switch (props.state) {
    case "bc1":
      return store.$state.ban.bc1;
    case "bc2":
      return store.$state.ban.bc2;
    case "bc3":
      return store.$state.ban.bc3;
    case "bc4":
      return store.$state.ban.bc4;
    case "bl1":
      return store.$state.ban.bl1;
    case "bl2":
      return store.$state.ban.bl2;
    case "c1":
      return store.$state.character.c1;
    case "c2":
      return store.$state.character.c2;
    case "c3":
      return store.$state.character.c3;
    case "c4":
      return store.$state.character.c4;
    case "c5":
      return store.$state.character.c5;
    case "c6":
      return store.$state.character.c6;
    case "c7":
      return store.$state.character.c7;
    case "c8":
      return store.$state.character.c8;
    case "c9":
      return store.$state.character.c9;
    case "c10":
      return store.$state.character.c10;
    case "c11":
      return store.$state.character.c11;
    case "c12":
      return store.$state.character.c12;
    case "c13":
      return store.$state.character.c13;
    case "c14":
      return store.$state.character.c14;
    case "c15":
      return store.$state.character.c15;
    case "c16":
      return store.$state.character.c16;
    default:
      return null;
  }
});
const model1 = computed(() => {
  switch (props.state) {
    case "c1":
      return store.$state.character.c1;
    case "c2":
      return store.$state.character.c2;
    case "c3":
      return store.$state.character.c3;
    case "c4":
      return store.$state.character.c4;
    case "c5":
      return store.$state.character.c5;
    case "c6":
      return store.$state.character.c6;
    case "c7":
      return store.$state.character.c7;
    case "c8":
      return store.$state.character.c8;
    case "c9":
      return store.$state.character.c9;
    case "c10":
      return store.$state.character.c10;
    case "c11":
      return store.$state.character.c11;
    case "c12":
      return store.$state.character.c12;
    case "c13":
      return store.$state.character.c13;
    case "c14":
      return store.$state.character.c14;
    case "c15":
      return store.$state.character.c15;
    case "c16":
      return store.$state.character.c16;
    default:
      return null;
  }
});
const selectCharacter = () => {
  store.updateGameData(`${props.isLightCone ? 'lightcone' : 'character'}/${props.state}/img`, char.value.icon);
  store.updateGameData(`${props.isLightCone ? 'lightcone' : 'character'}/${props.state}/name`, char.value.name);
  store.updateGameData(`${props.isLightCone ? 'lightcone' : 'character'}/${props.state}/path`, char.value.path);
  store.updateGameData(`character/${props.state}/point/0`, char.value.point[0]);
  store.updateGameData(`character/${props.state}/point/1`, char.value.point[1]);
  store.updateGameData(`character/${props.state}/point/2`, char.value.point[2]);
  store.updateGameData(`character/${props.state}/point/3`, char.value.point[3]);
  store.updateGameData(`character/${props.state}/point/4`, char.value.point[4]);
  store.updateGameData(`character/${props.state}/point/5`, char.value.point[5]);
  store.updateGameData(`character/${props.state}/point/6`, char.value.point[6]);
  store.updateGameData(`state/point/${props.team}p/char/${props.index}`, char.value.point[eiloidon.value]);
};
const banCharacter = () => {
  store.updateGameData(`ban/${props.state}/img`, char.value.icon);
  store.updateGameData(`ban/${props.state}/name`, char.value.name);
  store.updateGameData(`ban/${props.state}/path`, char.value.path);
};
const banLightcone = () => {
  store.updateGameData(`ban/${props.state}/img`, lc.value.preview);
  store.updateGameData(`ban/${props.state}/name`, lc.value.name);
  store.updateGameData(`ban/${props.state}/path`, lc.value.path);
};
onMounted(() => {
  store.initializeRealtimeListeners();
});
</script>

