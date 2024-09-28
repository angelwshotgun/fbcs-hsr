<template>
  <div class="flex justify-between">
    <div
    class="box flex flex-col items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-#64477c duration-300 bg-primary"
    @click="rollNumber1"
  >
    <label>Roll Team 1</label>
    <label>{{ team1 }}</label>
  </div>
  <div
    class="box1 flex flex-col items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-#64477c duration-300 bg-primary"
    @click="store.startTimer"
  >
    <label>Timer</label>
    <label>{{ timer }}</label>
  </div>
  <div
    class="box flex flex-col items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-#64477c duration-300 bg-primary"
    @click="rollNumber2"
  >
    <label>Roll Team 2</label>
    <label>{{ team2 }}</label>
  </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";
const store = useStore();

const team1 = ref(0);
const team2 = ref(0);
const rollNumber1 = () => {
  team1.value = Math.floor(Math.random() * 99) + 1
}
const rollNumber2 = () => {
  team2.value = Math.floor(Math.random() * 99) + 1
}
onMounted(() => {
  store.initializeRealtimeListeners();
});
const timer = computed(() => {
  const minutes = Math.floor(store.$state.timer / 60).toString().padStart(2, '0');
  const seconds = (store.$state.timer % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
});

</script>

<style scoped>
.box {
  border: 2px solid #64477c;
  border-radius: 0.5em;
  color: white;
  width: fit-content;
  padding: 1em;
  margin: 1em;
  cursor: pointer;
}
.box1 {
  border: 2px solid #64477c;
  border-radius: 0.5em;
  color: white;
  width: fit-content;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 1em;
  padding-bottom: 1em;
  margin: 1em;
  cursor: pointer;
}
</style>
