<template>
  <ClientOnly>
    <div
      v-if="!props.isLightCone"
      class="w-full flex flex-col bg-black bg-opacity-40 rounded"
      :class="{ 'active-selection': banpick === props.stt }"
    >
      <div
        class="relative w-full h-[100px] flex flex-col justify-center items-center overflow-hidden"
      >
        <NuxtImg
          v-if="model?.img !== ''"
          :src="link + model?.img"
          :style="props.isBan ? 'filter: grayscale(100%);' : ''"
          class="object-contain w-auto h-100%"
        />
        <!-- <Select
        v-else
        v-model="char"
        :options="characters"
        option-label="name"
        filter
        placeholder="Chọn nhân vật"
        class="w-1/2"
        @change="props.isBan ? banCharacter() : selectCharacter()"
      /> -->
        <label
          v-if="!props.isBan"
          class="absolute top-0 right-0 m-2 bg-gray text-white font-bold text-xl bg-opacity-10 py-1 rounded text-xs w-12 text-center"
          >{{
            model1?.point[eiloidon] + (lc?.point[superimp] || 0) >= 0
              ? "+ " + (model1?.point[eiloidon] + (lc?.point[superimp] || 0))
              : model1?.point[eiloidon] + (lc?.point[superimp] || 0)
          }}</label
        >
      </div>
      <div v-if="!props.isBan" class="grid grid-cols-6 w-full gap-1">
        <Select
          v-model="eiloidon"
          :options="eiloidonSelect"
          option-label="label"
          option-value="value"
          filter
          class="col-span-1"
          @change="changeEiloidon()"
        />
        <Select
          v-model="lc"
          :options="filterLightcones"
          option-label="name"
          :filterFields="['name', 'character']"
          filter
          placeholder="Chọn nón ánh sáng"
          class="col-span-4"
          @change="selectLightcone()"
        >
          <template #option="slotProps">
            <div class="flex justify-between w-300px">
              <div class="w-80% break-words whitespace-normal">
                {{ slotProps.option.name }}
              </div>
              <NuxtImg
                v-if="slotProps.option.preview !== ''"
                :src="link + slotProps.option.preview"
                class="w-20% h-auto"
              />
            </div>
          </template>
        </Select>
        <Select
          v-model="superimp"
          :options="superimpSelect"
          option-label="label"
          option-value="value"
          filter
          class="col-span-1"
          @change="changeLightcone()"
        />
      </div>
    </div>
    <div
      v-else
      class="w-full flex flex-col bg-black bg-opacity-40 rounded"
      :class="{ 'active-selection': banpick === props.stt }"
    >
      <div
        class="w-full h-[100px] flex flex-col justify-center items-center overflow-hidden"
      >
        <NuxtImg
          v-if="model?.img !== ''"
          :src="link + model?.img"
          :style="props.isBan ? 'filter: grayscale(100%);' : ''"
          class="object-contain w-20% h-auto"
        />
        <!-- <Select
        v-else
        v-model="lc"
        :options="light_cones"
        option-label="name"
        filter
        placeholder="Chọn nón ánh sáng"
        class="w-1/2"
        @change="banLightcone()"
      /> -->
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const route = useRoute();
const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const props = defineProps({
  isBan: Boolean,
  isLightCone: Boolean,
  state: String,
  bp: String,
  lcstate: String,
  index: Number,
  team: String,
  data: Object,
  stt: Number,
  characters: Object,
  light_cones: Object,
  light_cones34: Object,
  filterCharacters: Object,
});

const id = route.params.id;
const characters = ref(props.characters);
const light_cones = ref(props.light_cones);
const light_cones34 = ref(props.light_cones34);
const filterLightcones = ref();
const char = ref();
const lc = ref();
const eiloidon = ref(0);
const superimp = ref(0);
const selectedStage = computed(() => {
  return store.$state.games[id].stage;
});
const eiloidonSelect = ref([
  { label: "e0", value: 0 },
  { label: "e1", value: 1 },
  { label: "e2", value: 2 },
  { label: "e3", value: 3 },
  { label: "e4", value: 4 },
  { label: "e5", value: 5 },
  { label: "e6", value: 6 },
]);
const superimpSelect = ref([
  { label: "s1", value: 0 },
  { label: "s2", value: 1 },
  { label: "s3", value: 2 },
  { label: "s4", value: 3 },
  { label: "s5", value: 4 },
]);

const banpick = computed(() => {
  return store.$state.games[id].banpick;
});
watch(banpick, () => {
  const team = [
    1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2,
  ];
  if (banpick.value >= 1 && banpick.value <= 22) {
    store.updateGameData(`${id}`, "team", team[banpick.value - 1]);
  }
});
watch(
  () => props.data,
  () => {
    if (banpick.value == props.stt) {
      if (props.isBan && props.isLightCone) {
        if (props.isLightCone) {
          lc.value = props.data;
        } else char.value = props.data;
        banLightcone();
      } else if (props.isBan && !props.isLightCone) {
        if (props.isLightCone) {
          lc.value = props.data;
        } else char.value = props.data;
        banCharacter();
      } else if (!props.isBan && props.isLightCone) {
        if (props.isLightCone) {
          lc.value = props.data;
        } else char.value = props.data;
        selectLightcone();
      } else if (!props.isBan && !props.isLightCone) {
        if (props.isLightCone) {
          lc.value = props.data;
        } else char.value = props.data;
        selectCharacter();
      }
    }
  },
  { deep: true }
);
watch(props, () => {
  characters.value = props.characters;
  light_cones.value = props.light_cones;
  light_cones34.value = props.light_cones34;
  if (light_cones34.value && light_cones.value) {
    const data = [...light_cones.value, ...light_cones34.value].map(item => ({...item}));
    filterLightcones.value = data;
  }
})
onMounted(async () => {
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
const selectCharacter = () => {
  store.updateGameData(
    `${id}`,
    `${props.isLightCone ? "lightcone" : "character"}/${props.state}/img`,
    char.value.icon
  );
  store.updateGameData(
    `${id}`,
    `${props.isLightCone ? "lightcone" : "character"}/${props.state}/name`,
    char.value.name
  );
  store.updateGameData(
    `${id}`,
    `${props.isLightCone ? "lightcone" : "character"}/${props.state}/path`,
    char.value.path
  );
  store.updateGameData(
    `${id}`,
    `character/${props.state}/point/0`,
    char.value.point[0]
  );
  store.updateGameData(
    `${id}`,
    `character/${props.state}/point/1`,
    char.value.point[1]
  );
  store.updateGameData(
    `${id}`,
    `character/${props.state}/point/2`,
    char.value.point[2]
  );
  store.updateGameData(
    `${id}`,
    `character/${props.state}/point/3`,
    char.value.point[3]
  );
  store.updateGameData(
    `${id}`,
    `character/${props.state}/point/4`,
    char.value.point[4]
  );
  store.updateGameData(
    `${id}`,
    `character/${props.state}/point/5`,
    char.value.point[5]
  );
  store.updateGameData(
    `${id}`,
    `character/${props.state}/point/6`,
    char.value.point[6]
  );
  store.updateGameData(
    `${id}`,
    `state/point/${props.team}p/char/${props.index}`,
    char.value.point[eiloidon.value]
  );
  store.updateGameData(`${id}`, `character/${props.lcstate}/e`, eiloidon.value);
  store.updateGameData(`${id}`, `state/data/name`, char.value.portrait);
};
const changeEiloidon = () => {
  store.updateGameData(
    `${id}`,
    `state/point/${props.team}p/char/${props.index}`,
    char.value.point[eiloidon.value]
  );
  store.updateGameData(`${id}`, `character/${props.state}/e`, eiloidon.value);
};
const selectLightcone = () => {
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/img`,
    lc.value.icon
  );
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/name`,
    lc.value.name
  );
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/path`,
    lc.value.path
  );
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/point/0`,
    lc.value.point[0]
  );
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/point/1`,
    lc.value.point[1]
  );
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/point/2`,
    lc.value.point[2]
  );
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/point/3`,
    lc.value.point[3]
  );
  store.updateGameData(
    `${id}`,
    `lightcone/${props.lcstate}/point/4`,
    lc.value.point[4]
  );
  store.updateGameData(
    `${id}`,
    `state/point/${props.team}p/lc/${props.index}`,
    lc.value.point[superimp.value]
  );
  store.updateGameData(`${id}`, `lightcone/${props.lcstate}/s`, superimp.value);
};
const changeLightcone = () => {
  store.updateGameData(
    `${id}`,
    `state/point/${props.team}p/lc/${props.index}`,
    lc.value.point[superimp.value]
  );
  store.updateGameData(`${id}`, `lightcone/${props.lcstate}/s`, superimp.value);
};
const banCharacter = () => {
  store.updateGameData(`${id}`, `ban/${props.state}/img`, char.value.icon);
  store.updateGameData(`${id}`, `ban/${props.state}/name`, char.value.name);
  store.updateGameData(`${id}`, `ban/${props.state}/path`, char.value.path);
  store.updateGameData(`${id}`, `state/data/name`, char.value.portrait);
};
const banLightcone = () => {
  store.updateGameData(`${id}`, `ban/${props.state}/img`, lc.value.preview);
  store.updateGameData(`${id}`, `ban/${props.state}/name`, lc.value.name);
  store.updateGameData(`${id}`, `ban/${props.state}/path`, lc.value.path);
  store.updateGameData(`${id}`, `state/data/name`, lc.value.portrait);
};
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

.p-select {
  background-color: #56406d;
  font-size: 16px;
  border: #767676 1px solid;
  border-radius: 0.3em;
  text-align: center;
  height: 30px;
}
:deep(.p-select-label.p-placeholder) {
  color: white;
  font-size: 16px;
  text-align: center;
  padding-top: 4px;
}
:deep(.p-select-item) {
  color: white;
  font-size: 16px;
  text-align: center;
  padding-top: 4px;
}
:deep(.p-select-label) {
  color: white;
  font-size: 16px;
  text-align: center;
  padding-top: 4px;
}
:deep(.p-select-dropdown) {
  display: none;
  text-align: center;
}
.p-select-item:hover {
  background-color: #57436c;
}
.p-select-item.p-highlight {
  background-color: #57436c;
}
</style>
