<template>
  <div class="flex justify-between rounded-md">
    <div
      class="layout-point flex justify-center items-center flex-gap-1 w-full"
    >
      <Tag
        :class="{
          'text-blue-500': isTeamBlue && !isDraw,
          'text-red-500': !isTeamBlue && !isDraw,
          'text-white': isDraw,
        }"
        :severity="isTeamBlue && !isDraw ? 'info' : isDraw ? 'secondary' : 'danger'"
      >
        <div class="text-xl">{{ label }}</div>
      </Tag>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";
const store = useStore();

const isTeamBlue = ref(true);
const isDraw = ref(false);

onMounted(() => {
});

const banpick = computed(() => {
  return store.$state.banpick;
});

const bluetotal = computed(() => {
  return (
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
  );
});

const redtotal = computed(() => {
  return (
    store.$state.state.point.redp.char[0] +
    store.$state.state.point.redp.char[1] +
    store.$state.state.point.redp.char[2] +
    store.$state.state.point.redp.char[3] +
    store.$state.state.point.redp.char[4] +
    store.$state.state.point.redp.char[5] +
    store.$state.state.point.redp.char[6] +
    store.$state.state.point.redp.char[7] +
    store.$state.state.point.redp.lc[0] +
    store.$state.state.point.redp.lc[1] +
    store.$state.state.point.redp.lc[2] +
    store.$state.state.point.redp.lc[3] +
    store.$state.state.point.redp.lc[4] +
    store.$state.state.point.redp.lc[5] +
    store.$state.state.point.redp.lc[6] +
    store.$state.state.point.redp.lc[7]
  );
});

const bluepoint = computed(() => {
  const totalValue = Number(bluetotal.value);
  let adjustedTotal;
  if (totalValue <= 30) {
    adjustedTotal = (totalValue - 30) / 6;
  } else {
    adjustedTotal = (totalValue - 30) / 4;
  }
  const result = adjustedTotal;
  return Number(result.toFixed(2));
});

const redpoint = computed(() => {
  const totalValue = Number(redtotal.value);
  let adjustedTotal;
  if (totalValue <= 30) {
    adjustedTotal = (totalValue - 30) / 6;
  } else {
    adjustedTotal = (totalValue - 30) / 4;
  }
  const result = adjustedTotal;
  return Number(result.toFixed(2));
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
  } else if (banpick.value > 22) {
    const difference = bluepoint.value + 5 - (redpoint.value + 5);
    if (difference < 0) {
      const roundedDifference = Math.ceil(Math.abs(difference));
      isTeamBlue.value = true;
      return `Blue Team Advantage ${roundedDifference} cc`;
    } else if (difference > 0) {
      const roundedDifference = Math.floor(difference);
      isTeamBlue.value = false;
      return `Red Team Advance ${roundedDifference} cc`;
    } else {
      isDraw.value = true;
      return "Draw";
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
