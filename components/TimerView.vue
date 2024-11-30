<template>
  <ClientOnly v-if="store.$state.games[id]">
    <div class="flex justify-center">
      <div class="box1 flex items-center justify-center bg-primary gap-5">
        <div class="flex flex-col items-center">
          <label>Team 1</label>
          <label :class="{ 'animate-pulse text-red-500': team1 < 15 }">{{
            secondsToTime(timerTeam1)
          }}</label>
        </div>
        <div class="flex flex-col items-center">
          <label>Team 2</label>
          <label :class="{ 'animate-pulse text-red-500': team2 < 15 }">{{
            secondsToTime(timerTeam2)
          }}</label>
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

const banpick = computed(() => {
  return store.$state.games[id]?.banpick ?? null;
});

const team = computed(() => {
  return store.$state.games[id]?.team ?? null;
});

const team1 = computed(() => {
  return store.$state.games[id]?.time.team1 ?? '15:00';
});

const team2 = computed(() => {
  return store.$state.games[id]?.time.team2 ?? '15:00';
});

const timerTeam1 = ref(team1.value ?? '15:00');
const timerTeam2 = ref(team2.value ?? '15:00');

let intervalIdTeam1 = null;
let intervalIdTeam2 = null;

// Chuyển đổi format time thành giây
function timeToSeconds(timeString) {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
}

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
  if (newTime === 0) {
    console.log('0');
    clearInterval(intervalIdTeam1);
  }
});
watch(team2, (newTime) => {
  timerTeam2.value = newTime;
  if (newTime === 0) {
    console.log('0');
    clearInterval(intervalIdTeam2);
  }
});

watch(team, (newVal) => {
  if (newVal === 1 && banpick.value > 1) {
    if (banpick.value <= 22) {
      clearInterval(intervalIdTeam2);
      console.log('clear');
    }
    intervalIdTeam1 = setInterval(() => {
      const currentTime = timerTeam1.value;
      const newTime = currentTime - 1;
      store.updateGameData(`${id}`, 'time/team1', newTime);
    }, 1000);
  } else if (newVal === 2 && banpick.value > 1) {
    if (banpick.value <= 21) {
      clearInterval(intervalIdTeam1);
      console.log('clear');
    }
    intervalIdTeam2 = setInterval(() => {
      const currentTime = timerTeam2.value;
      const newTime = currentTime - 1;
      store.updateGameData(`${id}`, 'time/team2', newTime);
    }, 1000);
  }
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
