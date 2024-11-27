<template>
  <ClientOnly v-if="store.$state.games[id]">
    <div class="flex justify-center">
      <div
        class="box1 flex flex-col items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-#64477c duration-300 bg-primary"
      >
        <label>{{ timer }}</label>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useStore } from '~/store/useStore';

const route = useRoute();
const store = useStore();
const id = route.params.id;
const timer = ref('15:00');
const banpick = computed(() => {
  return store.$state.games[id]?.banpick ?? null;
});

let intervalId = null;

onMounted(() => {});

watch(banpick, () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (banpick.value === 2) {
    timer.value = '15:00';
    startCountdown();
  }
});

function startCountdown() {
  let totalSeconds = 900;
  intervalId = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      const minutes = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      timer.value = `${minutes}:${seconds}`;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
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
  padding-left: 3em;
  padding-right: 3em;
  padding-top: 1em;
  padding-bottom: 1em;
  margin: 1em;
  cursor: pointer;
}
</style>
