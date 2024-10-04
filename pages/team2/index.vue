<template>
  <div class="flex flex-col md:flex-row justify-between gap-1 p-4">
    <div class="w-1/3 flex flex-col gap-2">
      <div class="w-auto flex flex-col gap-1">
        <div class="flex justify-between items-center bg-blue-500 h-10 rounded-md">
          <label class="pl-2 text-white text-xl">Blue Team</label>
          <label class="pr-2 text-white text-xl">{{
            store.$state.state.point.bluep.char[0] +
            store.$state.state.point.bluep.char[1] +
            store.$state.state.point.bluep.char[2] +
            store.$state.state.point.bluep.char[3] +
            store.$state.state.point.bluep.char[4] +
            store.$state.state.point.bluep.char[5] +
            store.$state.state.point.bluep.char[6] +
            store.$state.state.point.bluep.char[7] +
            store.$state.state.point.bluep.lc[0] +
            store.$state.state.point.bluep.lc[1] +
            store.$state.state.point.bluep.lc[2] +
            store.$state.state.point.bluep.lc[3] +
            store.$state.state.point.bluep.lc[4] +
            store.$state.state.point.bluep.lc[5] +
            store.$state.state.point.bluep.lc[6] +
            store.$state.state.point.bluep.lc[7]
          }}</label>
        </div>
        <div class="grid grid-cols-3 gap-1">
          <SelectView :is-light-cone="false" :is-ban="true" :state="'bc1'" />
          <SelectView :is-light-cone="false" :is-ban="true" :state="'bc2'" />
          <SelectView :is-light-cone="true" :is-ban="true" :state="'bl1'" />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c1'"
            :lcstate="'l1'"
            :index="0" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c2'"
            :lcstate="'l2'"
            :index="1" :team="'blue'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c3'"
            :lcstate="'l3'"
            :index="2" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c4'"
            :lcstate="'l4'"
            :index="3" :team="'blue'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c5'"
            :lcstate="'l5'"
            :index="4" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c6'"
            :lcstate="'l6'"
            :index="5" :team="'blue'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c7'"
            :lcstate="'l7'"
            :index="6" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c8'"
            :lcstate="'l8'"
            :index="7" :team="'blue'"
          />
        </div>
      </div>
    </div>
    <div class="w-1/3">
      <div class="rounded flex flex-col justify-center items-center p-2 w-full">
        <div class="bg-primary rounded px-5 py-2 flex flex-col">
          <label>Timer</label>
          <label>{{ timer }}</label>
          <label>{{ banpick }}</label>
        </div>
      </div>
      <InputText v-model="search" placeholder="Tìm kiếm..." class="w-full mb-1" />
      <div class="overflow-y-auto h-[65vh]"> <!-- Add a wrapper for scroll -->
        <div class="grid grid-cols-6 gap-1">
          <div
            v-for="item in filterCharacters"
            :key="item.id"
            class="flex flex-col items-center bg-primary rounded overflow-hidden"
          >
            <div class="w-full pb-[100%] relative">
              <NuxtImg
                :src="link + item.preview"
                :alt="item.name"
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] object-cover transition-transform duration-200 ease-in-out"
                @click="selectCharacter(item)"
                @mouseenter="$event.target.classList.add('scale-110')"
                @mouseleave="$event.target.classList.remove('scale-110')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-5">
        <Button label="Khóa" class="w-1/4" @click="lockCharacter" />
      </div>
    </div>
    <div class="w-1/3 flex flex-col gap-2">
      <SelectOptions :is-light-cone="false" :is-ban="true" :state="'bc3'" :index="0" :team="'red'" :data="data" :stt="2"/>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c9'" :lcstate="'l9'" :index="1" :team="'red'" :data="data" :stt="4"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c10'" :lcstate="'l10'" :data="data" :stt="5"/>
      </div>
      <SelectOptions :is-light-cone="false" :is-ban="true" :state="'bc4'" :index="2" :team="'red'" :data="data" :stt="7"/>
      <SelectOptions :is-light-cone="true" :is-ban="true"  :state="'bl2'" :index="3" :team="'red'" :data="data" :stt="10"/>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c11'" :lcstate="'l11'" :index="4" :team="'red'" :data="data" :stt="11"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c12'" :lcstate="'l12'" :index="5" :team="'red'" :data="data" :stt="14"/>
      </div>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c13'" :lcstate="'l13'" :index="6" :team="'red'" :data="data" :stt="15"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c14'" :lcstate="'l14'" :data="data" :stt="18"/>
      </div>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c15'" :lcstate="'l15'" :index="7" :team="'red'" :data="data" :stt="19"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c16'" :lcstate="'l16'" :index="8" :team="'red'" :data="data" :stt="22"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";
const data=ref()
const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const search = ref();
const characters = ref();
const filterCharacters = ref();
const light_cones = ref();
fetch("api/characters")
  .then((res) => res.json())
  .then((data) => {
    characters.value = Object.values(data);
    filterCharacters.value = Object.values(data);
  });

fetch("api/light_cones")
  .then((res) => res.json())
  .then((data) => {
    light_cones.value = Object.values(data);
  });
onMounted(() => {
  store.initializeRealtimeListeners();
});
const timer = computed(() => {
  const minutes = Math.floor(store.$state.timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (store.$state.timer % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});
const banpick = computed(() => {
  return store.$state.banpick;
});
const team = computed(() => {
  return store.$state.team;
});
watch(banpick, (newVal) => {
  if (newVal === 10) {
    filterCharacters.value = light_cones.value.filter((item) =>
      item.name.toLowerCase().includes(search.value?.toLowerCase() || "")
    );
  } else {
    filterCharacters.value = characters.value.filter((item) =>
      item.name.toLowerCase().includes(search.value?.toLowerCase() || "")
    );
  }
});

watch(search, (newValue) => {
  if (banpick.value === 10) {
    filterCharacters.value = light_cones.value.filter((item) =>
      item.name.toLowerCase().includes(newValue.toLowerCase())
    );
  } else {
    filterCharacters.value = characters.value.filter((item) =>
      item.name.toLowerCase().includes(newValue.toLowerCase())
    );
  }
});
const selectCharacter = (item) => {
  if (team.value === 2) {
    data.value = item;
  }
}
const lockCharacter = () => {
  store.updateGameData("banpick", banpick.value + 1);
}
</script>
