<template>
  <ClientOnly>
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
        <div v-if="model?.img == '' && props.isBan">
          <img
            src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/sign/AvatarIcon.png"
            alt="Avatar Icon"
            class="blink"
            style="opacity: 0.5"
          />
        </div>
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
          <!-- <video ref="videoPlayer" autoplay loop muted class="absolute top-0 left-0 w-full h-full object-cover -z-10">
      <source src="~/public/acheron.mp4" type="video/mp4" />
    </video> -->
          <label
            v-if="!props.isBan && model?.img"
            class="text-white font-bold text-xl text-sm text-center pr-24"
          >
            {{ model1?.name }}
            <span v-if="banpick > 22">
              E{{ model1?.e
              }}{{
                model2?.img !== ""
                  ? "S" + (model2?.s !== undefined ? model2.s + 1 : "")
                  : ""
              }}
            </span>
          </label>
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
    <div
      v-else
      class="w-full flex flex-col bg-black bg-opacity-40 rounded-md"
      :class="{ 'active-selection': banpick === props.stt }"
    >
      <div
        class="w-full h-[100px] flex flex-col justify-center items-center overflow-hidden"
      >
        <div v-if="model?.img == '' && isBan">
          <img
            src="https://api.hakush.in/hsr/UI/tabicon/inventory/InventoryLightConeIcon.webp"
            alt="Avatar Icon"
            class="blink"
            style="opacity: 0.5"
          />
        </div>
        <NuxtImg
          v-else
          :src="link + model?.img"
          :style="props.isBan ? 'filter: grayscale(100%);' : ''"
          class="object-contain h-100% w-auto"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const route = useRoute();
const store = useStore();
const link = "/";

const char = ref();
const id = route.params.id;

onMounted(() => {});

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
  return store.$state.games[id].banpick;
});
const model = computed(() => {
  switch (props.state) {
    case "bc1":
      return store.$state.games[id].ban.bc1;
    case "bc2":
      return store.$state.games[id].ban.bc2;
    case "bc3":
      return store.$state.games[id].ban.bc3;
    case "bc4":
      return store.$state.games[id].ban.bc4;
    case "bl1":
      return store.$state.games[id].ban.bl1;
    case "bl2":
      return store.$state.games[id].ban.bl2;
    case "c1":
      return store.$state.games[id].character.c1;
    case "c2":
      return store.$state.games[id].character.c2;
    case "c3":
      return store.$state.games[id].character.c3;
    case "c4":
      return store.$state.games[id].character.c4;
    case "c5":
      return store.$state.games[id].character.c5;
    case "c6":
      return store.$state.games[id].character.c6;
    case "c7":
      return store.$state.games[id].character.c7;
    case "c8":
      return store.$state.games[id].character.c8;
    case "c9":
      return store.$state.games[id].character.c9;
    case "c10":
      return store.$state.games[id].character.c10;
    case "c11":
      return store.$state.games[id].character.c11;
    case "c12":
      return store.$state.games[id].character.c12;
    case "c13":
      return store.$state.games[id].character.c13;
    case "c14":
      return store.$state.games[id].character.c14;
    case "c15":
      return store.$state.games[id].character.c15;
    case "c16":
      return store.$state.games[id].character.c16;
    default:
      return null;
  }
});
const model1 = computed(() => {
  switch (props.state) {
    case "c1":
      return store.$state.games[id].character.c1;
    case "c2":
      return store.$state.games[id].character.c2;
    case "c3":
      return store.$state.games[id].character.c3;
    case "c4":
      return store.$state.games[id].character.c4;
    case "c5":
      return store.$state.games[id].character.c5;
    case "c6":
      return store.$state.games[id].character.c6;
    case "c7":
      return store.$state.games[id].character.c7;
    case "c8":
      return store.$state.games[id].character.c8;
    case "c9":
      return store.$state.games[id].character.c9;
    case "c10":
      return store.$state.games[id].character.c10;
    case "c11":
      return store.$state.games[id].character.c11;
    case "c12":
      return store.$state.games[id].character.c12;
    case "c13":
      return store.$state.games[id].character.c13;
    case "c14":
      return store.$state.games[id].character.c14;
    case "c15":
      return store.$state.games[id].character.c15;
    case "c16":
      return store.$state.games[id].character.c16;
    default:
      return null;
  }
});
const model2 = computed(() => {
  switch (props.lcstate) {
    case "l1":
      return store.$state.games[id].lightcone.l1;
    case "l2":
      return store.$state.games[id].lightcone.l2;
    case "l3":
      return store.$state.games[id].lightcone.l3;
    case "l4":
      return store.$state.games[id].lightcone.l4;
    case "l5":
      return store.$state.games[id].lightcone.l5;
    case "l6":
      return store.$state.games[id].lightcone.l6;
    case "l7":
      return store.$state.games[id].lightcone.l7;
    case "l8":
      return store.$state.games[id].lightcone.l8;
    case "l9":
      return store.$state.games[id].lightcone.l9;
    case "l10":
      return store.$state.games[id].lightcone.l10;
    case "l11":
      return store.$state.games[id].lightcone.l11;
    case "l12":
      return store.$state.games[id].lightcone.l12;
    case "l13":
      return store.$state.games[id].lightcone.l13;
    case "l14":
      return store.$state.games[id].lightcone.l14;
    case "l15":
      return store.$state.games[id].lightcone.l15;
    case "l16":
      return store.$state.games[id].lightcone.l16;
    default:
      return null;
  }
});
const model3 = computed(() => {
  switch (props.team) {
    case "blue":
      return store.$state.games[id].state.point.bluep;
    case "red":
      return store.$state.games[id].state.point.redp;
    default:
      return null;
  }
});
</script>

<style scoped>
.active-selection {
  border: 2px solid rgb(213, 176, 234);
  animation: pulse 2s infinite;
  animation: blinkEffect 3s infinite;
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
@keyframes blinkEffect {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
