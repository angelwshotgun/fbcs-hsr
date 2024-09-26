<template>
  <div class="flex justify-end">
    <div class="w-2/5 flex flex-col gap-2">
      <SelectOptions :is-light-cone="false" :is-ban="true" :state="'bc3'"/>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c9'" :lcstate="'l9'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c10'" :lcstate="'l10'"/>
      </div>
      <SelectOptions :is-light-cone="false" :is-ban="true" :state="'bc4'" />
      <SelectOptions :is-light-cone="true" :is-ban="true"  :state="'bl2'" />
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c11'" :lcstate="'l11'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c12'" :lcstate="'l12'"/>
      </div>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c13'" :lcstate="'l13'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c14'" :lcstate="'l14'"/>
      </div>
      <div class="flex">
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c15'" :lcstate="'l15'"/>
        <SelectOptions :is-light-cone="false" :is-ban="false" :state="'c16'" :lcstate="'l16'"/>
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
