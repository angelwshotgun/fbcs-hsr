<template>
    <ClientOnly v-if="store.$state.games[id]">
      <div class="flex justify-center">
        <div class="box1 flex items-center justify-center bg-primary gap-5">
          <div class="flex flex-col items-center">
            <label>Team 1</label>
            <label>{{ secondsToTime(timerTeam1) }}</label>
          </div>
          <div class="flex flex-col items-center">
            <label>Team 2</label>
            <label>{{ secondsToTime(timerTeam2) }}</label>
          </div>
        </div>
      </div>
    </ClientOnly>
  </template>
  
  <script setup>
  import { useStore } from '~/store/useStore';
  
  const route = useRoute();
  const store = useStore();
  const id = route.params.id;
  
  const team1 = computed(() => {
    return store.$state.games[id]?.time.team1 ?? '15:00';
  });
  
  const team2 = computed(() => {
    return store.$state.games[id]?.time.team2 ?? '15:00';
  });
  
  const timerTeam1 = ref(team1.value ?? '15:00');
  const timerTeam2 = ref(team2.value ?? '15:00');
  
  // Chuyển đổi giây thành format time
  function secondsToTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  
  watch(team1, (newTime) => {
    timerTeam1.value = newTime;
  });
  watch(team2, (newTime) => {
    timerTeam2.value = newTime;
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
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    margin: 1em;
    cursor: pointer;
  }
  </style>
  