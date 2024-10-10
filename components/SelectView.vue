<template>
  <div
    v-if="!props.isLightCone"
    class="w-full flex flex-col bg-black bg-opacity-40 rounded-md"
    :class="{ 'active-selection': banpick === props.stt }"
  >
    <div
      :class="[
        'relative',
        'w-full',
        props.isBan ? 'h-[100px]' : 'h-[180px]',
        'flex',
        'justify-center',
        'items-center',
        'overflow-hidden',
      ]"
    >
      <div v-if="model?.img == '' && props.isBan">Banning...</div>
      <div v-else-if="model?.img == '' && !props.isBan">Picking...</div>
      <div :class="['flex', 'flex-col', 'h-100%']">
        <NuxtImg
          v-if="model?.img !== ''"
          :src="link + model?.img"
          :style="props.isBan ? 'filter: grayscale(100%);' : ''"
          :class="[
            props.isBan ? 'h-100%' : 'h-80%',
            'object-contain',
            'w-auto',
            props.isBan ? '' : 'pr-24',
            props.isBan ? '' : 'pt-6',
          ]"
          @click="char = null"
        />
        <label
          v-if="!props.isBan && model?.img"
          class="text-white font-bold text-xl text-sm text-center pr-24"
          >{{ model1?.name + " e" + model1?.e + (model2?.img !== '' ? "s" + (model2?.s !== undefined ? model2.s + 1 : '') : '') }}</label
        >
      </div>
      <NuxtImg
        v-if="!props.isBan && model2?.img !== ''"
        :src="link + model2?.img"
        :style="props.isBan ? 'filter: grayscale(100%);' : ''"
        :class="[
          'absolute',
          'bottom-3',
          'right-3',
          'object-contain',
          'h-1/2',
          'w-auto',
          'max-w-1/3',
          'pr-2',
          'pb-1',
        ]"
        @click="char = null"
      />
      <label
        v-if="!props.isBan && model?.img"
        class="absolute top-0 right-0 m-2 bg-black text-white font-bold text-xl bg-opacity-35 px-1 py-1 rounded text-sm w-16 text-center"
        >{{
          model3?.char && model3?.lc && props.index !== undefined
            ? model3.char[props.index] + model3.lc[props.index] >= 0
              ? "+" + (model3.char[props.index] + model3.lc[props.index])
              : model3.char[props.index] + model3.lc[props.index]
            : ""
        }}</label
      >
    </div>
  </div>
  <div v-else class="w-full flex flex-col bg-black bg-opacity-40 rounded-md" :class="{ 'active-selection': banpick === props.stt }">
    <div
      class="w-full h-[100px] flex flex-col justify-center items-center overflow-hidden"
    >
      <div v-if="model?.img == '' && isBan">Banning...</div>
      <NuxtImg
        v-else
        :src="link + model?.img"
        :style="props.isBan ? 'filter: grayscale(100%);' : ''"
        class="object-contain h-100% w-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/useStore";

const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const char = ref();

onMounted(() => {
  store.initializeRealtimeListeners();
});

const props = defineProps({
  isBan: Boolean,
  isLightCone: Boolean,
  state: String,
  bp: String,
  lcstate: String,
  index: Number,
  team: String,
  stt: Number,
});

const banpick = computed(() => {
  return store.$state.banpick;
});
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
  switch (props.lcstate) {
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
});
const model3 = computed(() => {
  switch (props.team) {
    case "blue":
      return store.$state.state.point.bluep;
    case "red":
      return store.$state.state.point.redp;
    default:
      return null;
  }
});
</script>

<style scoped>
.active-selection {
  border: 2px solid rgb(213, 176, 234);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(213, 176, 234, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(213, 176, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(213, 176, 234, 0);
  }
}
</style>
