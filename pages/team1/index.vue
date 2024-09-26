<template>
  <div class="flex justify-between">
    <div class="w-2/5 flex flex-col gap-2">
      <SelectOptions :is-light-cone="false" :is-ban="true" :state="'bc1'"/>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c1'" :lcstate="'l1'" :index="0" :team="'blue'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c2'" :lcstate="'l2'" :index="1" :team="'blue'"/>
      </div>
      <SelectOptions :is-light-cone="false" :is-ban="true" :state="'bc2'" />
      <SelectOptions :is-light-cone="true" :is-ban="true"  :state="'bl1'" />
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c3'" :lcstate="'l3'" :index="2" :team="'blue'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c4'" :lcstate="'l4'" :index="3" :team="'blue'"/>
      </div>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c5'" :lcstate="'l5'" :index="4" :team="'blue'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c6'" :lcstate="'l6'" :index="5" :team="'blue'"/>
      </div>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c7'" :lcstate="'l7'" :index="6" :team="'blue'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c8'" :lcstate="'l8'" :index="7" :team="'blue'"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";
const { data } = await useFetch("/api/characters");
const characters = ref();
characters.value = Object.values(data.value);
onMounted(() => {
  store.initializeRealtimeListeners();
});
const char = ref();
const state = computed(() => store.$state.state.index);
const team = computed(() => store.$state.state.team);
</script>
