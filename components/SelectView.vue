<template>
  <div v-if="!props.isLightCone" class="w-full flex flex-col">
    <div class="relative w-full h-[100px] flex flex-col justify-center items-center overflow-hidden">
      <div v-if="model?.img == '' && isBan">Banning...</div>
      <div v-else-if="model?.img == '' && !isBan">Picking...</div>
      <NuxtImg
        v-else
        :src="link + model?.img"
        :style="props.isBan ? 'filter: grayscale(100%);' : ''"
        class="object-contain w-30% h-auto"
        @click="char = null"
      />
      <label v-if="!props.isBan && model?.img" class="absolute top-0 right-0 m-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm">{{ "+ " + (model1?.point[eiloidon] + (lc?.point[superimp] || 0)) }}</label>
    </div>
    <div v-if="!props.isBan" class="grid grid-cols-6 w-full">
      <label
        class="col-span-1"
      >{{ model2?.path }}</label>
      <label
        class="col-span-4"
      >{{ model2?.name }}</label>
      <label
        class="col-span-1"
      >{{ model2?.path }}</label>
    </div>
  </div>
  <div v-else class="w-full flex flex-col">
    <div class="w-full h-[100px] flex flex-col justify-center items-center overflow-hidden">
      <div v-if="model?.img == '' && isBan">Banning...</div>
      <NuxtImg
        v-else
        :src="link + model?.img"  
        :style="props.isBan ? 'filter: grayscale(100%);' : ''"
        class="object-contain w-20% h-auto"
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
  const eiloidon = ref();
  const superimp = ref();
  const eiloidonSelect = ref([0,1,2,3,4,5,6])
  const superimpSelect = ref([1,2,3,4,5])
  
  fetch("/api/characters")
    .then((res) => res.json())
    .then((data) => {
      characters.value = Object.values(data);
    });
  
  fetch("/api/light_cones")
    .then((res) => res.json())
    .then((data) => {
      light_cones.value = Object.values(data);
    });
  
  onMounted(() => {
    store.initializeRealtimeListeners();
    eiloidon.value = "0";
    superimp.value = 1;
  });
  
  const props = defineProps({
    isBan: Boolean,
    isLightCone: Boolean,
    state: String,
    bp: String,
    lcstate: String,
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
  const model2 = computed(() => {
    switch(props.lcstate) {
      case "l1":
        return store.$state.lightcone.l1;
      case "l2":
        return store.$state.lightcone.l2;
      case "l3":
        return store.$state.lightcone.l3;
      case "l4":
        return store.$state.lightcone.l4;
      case "l5":
        return store.$state.lightcone.l5;
      case "l6":
        return store.$state.lightcone.l6;
      case "l7":
        return store.$state.lightcone.l7;
      case "l8":
        return store.$state.lightcone.l8;
      case "l9":
        return store.$state.lightcone.l9;
      case "l10":
        return store.$state.lightcone.l10;
      case "l11":
        return store.$state.lightcone.l11;
      case "l12":
        return store.$state.lightcone.l12;
      case "l13":
        return store.$state.lightcone.l13;
      case "l14":
        return store.$state.lightcone.l14;
      case "l15":
        return store.$state.lightcone.l15;
      case "l16":
        return store.$state.lightcone.l16;
      default:
        return null;
    }
  })
  </script>
  
  