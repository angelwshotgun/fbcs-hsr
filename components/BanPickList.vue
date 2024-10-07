<template>
  <div>
    <div class="rounded flex flex-col justify-center items-center p-2 w-full">
      <div class="bg-primary rounded px-5 py-2 flex flex-col">
        <label>Timer</label>
        <label>{{ timer }}</label>
        <label>{{ banpick }}</label>
        <Button label="+" @click="dosth()" />
      </div>
    </div>
    <InputText placeholder="Tìm kiếm..." class="w-full mb-1" />
    <div class="grid grid-cols-6 gap-1">
      <div
        v-for="item in characters"
        :key="item.id"
        class="flex flex-col items-center bg-primary rounded overflow-hidden"
      >
        <div class="w-full pb-[100%] relative">
          <NuxtImg
            :src="link + item.preview"
            :alt="item.name"
            class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] object-cover"
            @click="selectCharacter(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/useStore";

const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const characters = ref();
const light_cones = ref();

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

onMounted(() => {
  store.initializeRealtimeListeners();
});

const banpick = computed(() => {
  return store.$state.banpick;
});
const model = computed(() => {
  switch (banpick.value) {
    case 0:
      return store.$state.ban.bc1;
    case 1:
      return store.$state.ban.bc3;
    case 2:
      return store.$state.character.c1;
    case 3:
      return store.$state.character.c9;
    case 4:
      return store.$state.character.c10;
    case 5:
      return store.$state.character.c2;
    case 6:
      return store.$state.ban.bc4;
    case 7:
      return store.$state.ban.bc2;
    case 8:
      return store.$state.ban.bl1;
    case 9:
      return store.$state.ban.bl2;
    case 10:
      return store.$state.character.c11;
    case 11:
      return store.$state.character.c3;
    case 12:
      return store.$state.character.c4;
    case 13:
      return store.$state.character.c12;
    case 14:
      return store.$state.character.c13;
    case 15:
      return store.$state.character.c5;
    case 16:
      return store.$state.character.c6;
    case 17:
      return store.$state.character.c14;
    case 18:
      return store.$state.character.c15;
    case 19:
      return store.$state.character.c7;
    case 20:
      return store.$state.character.c8;
    case 21:
      return store.$state.character.c16;
    default:
      return null;
  }
});
const selectCharacter = (item) => {
  store.updateGameData(`index/${banpick.value}/name`, item.name);
  store.updateGameData(`index/${banpick.value}/img`, item.icon);
  store.updateGameData(`index/${banpick.value}/point/0`, item.point[0]);
  store.updateGameData(`index/${banpick.value}/point/1`, item.point[0]);
  store.updateGameData(`index/${banpick.value}/point/2`, item.point[0]);
  store.updateGameData(`index/${banpick.value}/point/3`, item.point[0]);
  store.updateGameData(`index/${banpick.value}/point/4`, item.point[0]);
  store.updateGameData(`index/${banpick.value}/point/5`, item.point[0]);
  store.updateGameData(`index/${banpick.value}/point/6`, item.point[0]);
};
const dosth = () => {
  store.updateGameData("banpick", banpick.value + 1);
};
</script>
