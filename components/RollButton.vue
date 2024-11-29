<template>
  <ClientOnly v-if="store.$state.games[id]">
    <div class="flex justify-center">
      <div
        class="box1 flex items-center justify-center bg-primary gap-5"
      >
        <div class="flex flex-col items-center">
          <label>Team 1</label>
          <label>{{ timerTeam1 }}</label>
        </div>
        <div class="flex flex-col items-center">
          <label>Team 2</label>
          <label>{{ timerTeam2 }}</label>
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

const timerTeam1 = ref('15:00');
const timerTeam2 = ref('15:00');

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
  const seconds = (totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Watch for changes in the current team
watch(team, (newTeam, oldTeam) => {
  // Dừng timer của team cũ
  if (oldTeam === 1) {
    clearInterval(intervalIdTeam1);
  } else if (oldTeam === 2) {
    clearInterval(intervalIdTeam2);
  }

  // Bắt đầu timer của team mới
  if (newTeam === 1) {
    // Lấy giá trị time của team1 từ store
    const currentTime = team1.value;
    let totalSecondsTeam1 = timeToSeconds(currentTime);

    timerTeam1.value = currentTime;

    intervalIdTeam1 = setInterval(() => {
      if (totalSecondsTeam1 > 0) {
        totalSecondsTeam1--;
        timerTeam1.value = secondsToTime(totalSecondsTeam1);
        
        // Cập nhật game data cho Team 1
        store.updateGameData(
          `${id}`,
          `time/team1`,
          timerTeam1.value
        );
      } else {
        clearInterval(intervalIdTeam1);
      }
    }, 1000);
  } else if (newTeam === 2) {
    // Lấy giá trị time của team2 từ store
    const currentTime = team2.value;
    let totalSecondsTeam2 = timeToSeconds(currentTime);

    timerTeam2.value = currentTime;

    intervalIdTeam2 = setInterval(() => {
      if (totalSecondsTeam2 > 0) {
        totalSecondsTeam2--;
        timerTeam2.value = secondsToTime(totalSecondsTeam2);
        
        // Cập nhật game data cho Team 2
        store.updateGameData(
          `${id}`,
          `time/team2`,
          timerTeam2.value
        );
      } else {
        clearInterval(intervalIdTeam2);
      }
    }, 1000);
  }
});

// Watch for ban pick state changes
watch(banpick, () => {
  // Xóa bất kỳ timer nào đang chạy
  if (intervalIdTeam1) clearInterval(intervalIdTeam1);
  if (intervalIdTeam2) clearInterval(intervalIdTeam2);

  // Reset timers khi trạng thái ban pick thay đổi
  if (banpick.value === 2) {
    timerTeam1.value = '15:00';
    timerTeam2.value = '15:00';
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
