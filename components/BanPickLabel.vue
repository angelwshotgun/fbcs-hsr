<template>
  <div class="flex justify-between bg-primary p-1 rounded-md">
    <div
      class="layout-point flex justify-center items-center flex-gap-1 w-full"
    >
      <h2 :class="{ 'text-blue-500': isTeamBlue, 'text-red-500': !isTeamBlue }">{{ label }}</h2>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";
const store = useStore();

const isTeamBlue = ref(true);

onMounted(() => {
  store.initializeRealtimeListeners();
});

const banpick = computed(() => {
  return store.$state.banpick;
});

const label = computed(() => {
  const team = [
    1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2,
  ];
  if (banpick.value >= 1 && banpick.value <= 22) {
    const currentTeam = team[banpick.value - 1];
    if (currentTeam === 1) {
      isTeamBlue.value = true;
      return "Lượt team xanh";
    } else if (currentTeam === 2) {
      isTeamBlue.value = false;
      return "Lượt team đỏ";
    }
  }
  return "Lượt team xanh";
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
