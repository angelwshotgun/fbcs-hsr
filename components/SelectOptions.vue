<template>
  <div v-if="!props.isLightCone" class="w-full flex flex-col bg-primary rounded">
    <div
      class="relative w-full h-[100px] flex flex-col justify-center items-center overflow-hidden"
    >
      <NuxtImg
        v-if="model?.img !== ''"
        :src="link + model?.img"
        :style="props.isBan ? 'filter: grayscale(100%);' : ''"
        class="object-contain w-30% h-auto"
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
        class="absolute top-0 right-0 m-2 bg-black text-white font-bold text-xl bg-opacity-35 py-1 rounded text-xs w-12 text-center"
        >{{
          (model1?.point[eiloidon] + (lc?.point[superimp] || 0)) >= 0
            ? "+ " + (model1?.point[eiloidon] + (lc?.point[superimp] || 0))
            : (model1?.point[eiloidon] + (lc?.point[superimp] || 0))
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
        :options="light_cones"
        option-label="name"
        filter
        placeholder="Chọn nón ánh sáng"
        class="col-span-4"
        @change="selectLightcone()"
      />
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
  <div v-else class="w-full flex flex-col bg-primary">
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
</template>

<script setup lang="ts">
import { useStore } from "~/store/useStore";

const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const characters = ref();
const light_cones = ref();
const char = ref();
const lc = ref();
const eiloidon = ref<number>(0);
const superimp = ref<number>(0);
const selectedStage = computed(() => {
  return store.$state.stage;
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

async function fetchCharacters() {
  try {
    const response = await $fetch('/api/github/readCharacters', {
      method: 'POST',
      body: {
        action: 'readFile',
        owner: "angelwshotgun",
        repo: "DataStore",
        path: `data/characters${selectedStage.value === "11" ? "11" : ""}.json`
      }
    });
    if (response.error) {
      throw new Error(response.error);
    }
    characters.value = Object.values(response.content);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

async function fetchLightcones() {
  try {
    const response = await $fetch('/api/github/readCharacters', {
      method: 'POST',
      body: {
        action: 'readFile',
        owner: "angelwshotgun",
        repo: "DataStore",
        path: `data/light_cones${selectedStage.value === "11" ? "11" : ""}.json`
      }
    });
    if (response.error) {
      throw new Error(response.error);
    }
    light_cones.value = Object.values(response.content);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

const loadData = async () => {
  await fetchCharacters();
  await fetchLightcones();
};

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
});
const banpick = computed(() => {
  return store.$state.banpick;
});
watch(banpick, () => {
  const team = [1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2];
  if (banpick.value >= 1 && banpick.value <= 22) {
    store.updateGameData('team', team[banpick.value - 1]);
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
        console.log("Ban LightCone", props.isBan, props.isLightCone);
        banLightcone();
      } else if (props.isBan && !props.isLightCone) {
        if (props.isLightCone) {
          lc.value = props.data;
        } else char.value = props.data;
        banCharacter();
        console.log("Ban character", props.isBan, props.isLightCone);
      } else if (!props.isBan && props.isLightCone) {
        if (props.isLightCone) {
          lc.value = props.data;
        } else char.value = props.data;
        selectLightcone();
        console.log("select lightcone", props.isBan, props.isLightCone);
      } else if (!props.isBan && !props.isLightCone) {
        if (props.isLightCone) {
          lc.value = props.data;
        } else char.value = props.data;
        selectCharacter();
        console.log("select character", props.isBan, props.isLightCone);
      }
    }
  },
  { deep: true }
);
onMounted(async () => {
  store.initializeRealtimeListeners();
  await loadData();
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
const selectCharacter = () => {
  store.updateGameData(
    `${props.isLightCone ? "lightcone" : "character"}/${props.state}/img`,
    char.value.icon
  );
  store.updateGameData(
    `${props.isLightCone ? "lightcone" : "character"}/${props.state}/name`,
    char.value.name
  );
  store.updateGameData(
    `${props.isLightCone ? "lightcone" : "character"}/${props.state}/path`,
    char.value.path
  );
  store.updateGameData(`character/${props.state}/point/0`, char.value.point[0]);
  store.updateGameData(`character/${props.state}/point/1`, char.value.point[1]);
  store.updateGameData(`character/${props.state}/point/2`, char.value.point[2]);
  store.updateGameData(`character/${props.state}/point/3`, char.value.point[3]);
  store.updateGameData(`character/${props.state}/point/4`, char.value.point[4]);
  store.updateGameData(`character/${props.state}/point/5`, char.value.point[5]);
  store.updateGameData(`character/${props.state}/point/6`, char.value.point[6]);
  store.updateGameData(
    `state/point/${props.team}p/char/${props.index}`,
    char.value.point[eiloidon.value]
  );
  store.updateGameData(`character/${props.lcstate}/e`, eiloidon.value);
};
const changeEiloidon = () => {
  store.updateGameData(
    `state/point/${props.team}p/char/${props.index}`,
    char.value.point[eiloidon.value]
  );
  store.updateGameData(`character/${props.state}/e`, eiloidon.value);
};
const selectLightcone = () => {
  store.updateGameData(`lightcone/${props.lcstate}/img`, lc.value.icon);
  store.updateGameData(`lightcone/${props.lcstate}/name`, lc.value.name);
  store.updateGameData(`lightcone/${props.lcstate}/path`, lc.value.path);
  store.updateGameData(`lightcone/${props.lcstate}/point/0`, lc.value.point[0]);
  store.updateGameData(`lightcone/${props.lcstate}/point/1`, lc.value.point[1]);
  store.updateGameData(`lightcone/${props.lcstate}/point/2`, lc.value.point[2]);
  store.updateGameData(`lightcone/${props.lcstate}/point/3`, lc.value.point[3]);
  store.updateGameData(`lightcone/${props.lcstate}/point/4`, lc.value.point[4]);
  store.updateGameData(
    `state/point/${props.team}p/lc/${props.index}`,
    lc.value.point[superimp.value]
  );
  store.updateGameData(`lightcone/${props.lcstate}/s`, superimp.value);
};
const changeLightcone = () => {
  store.updateGameData(
    `state/point/${props.team}p/lc/${props.index}`,
    lc.value.point[superimp.value]
  );
  store.updateGameData(`lightcone/${props.lcstate}/s`, superimp.value);
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
</script>

<style scoped>
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