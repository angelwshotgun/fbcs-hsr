<template>
  <div class="flex justify-center my-3">
    <div
      class="layout-point flex justify-center flex-gap-1 bg-primary w-fit rounded-md"
    >
      <div class="box1 stats flex flex-col m-2">
        <div class="flex">
          <label class="text-blue font-bold text-lg w-3/4">Blue Team</label>
        </div>
        <div class="flex">
          <label class="flex w-3/4 items-center justify-center"
            >Node 1</label
          >
          <input
            v-model="bluecc1"
            type="text"
            class="input1 text-center w-1/4"
          />
        </div>
        <div class="flex">
          <label class="flex w-3/4 items-center justify-center"
            >Node 2</label
          >
          <input
            v-model="bluecc2"
            type="text"
            class="input1 text-center w-1/4"
          />
        </div>
        <div class="flex">
          <label class="flex w-3/4 items-center justify-center">Penalties</label>
          <input
            v-model="bluedeath"
            type="text"
            class="input1 text-center w-1/4"
          />
        </div>
        <div class="flex">
          <label class="flex w-3/4 items-center justify-center">Point</label>
          <input
            v-model="bluepoint"
            type="text"
            disabled
            class="input1 text-center w-1/4"
          />
        </div>
      </div>
      <div class="box1 stats flex flex-col m-2">
        <div class="flex justify-end">
          <label class="text-red font-bold text-lg w-3/4">Red Team</label>
        </div>
        <div class="flex">
          <input
            v-model="redcc1"
            type="text"
            class="input1 text-center w-1/4"
          />
          <label class="flex w-3/4 items-center justify-center"
            >Node 1</label
          >
        </div>
        <div class="flex">
          <input
            v-model="redcc2"
            placeholder="Phase 2 Cycles"
            type="text"
            class="input1 text-center w-1/4"
          />
          <label class="flex w-3/4 items-center justify-center"
            >Node 2</label
          >
        </div>
        <div class="flex">
          <input
            v-model="reddeath"
            type="text"
            class="input1 text-center w-1/4"
          />
          <label class="flex w-3/4 items-center justify-center">Penalties</label>
        </div>
        <div class="flex">
          <input
            v-model="redpoint"
            type="text"
            disabled
            class="input1 text-center w-1/4"
          />
          <label class="flex w-3/4 items-center justify-center">Point</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const store = useStore();

const bluecc1 = ref(0);
const bluecc2 = ref(0);
const bluedeath = ref(0);
const redcc1 = ref(0);
const redcc2 = ref(0);
const reddeath = ref(0);

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
    adjustedTotal = totalValue / 4;
  } else {
    adjustedTotal = 30 / 4 + (totalValue - 30) / 6;
  }
  const result = Number(bluecc1.value) +
    Number(bluecc2.value) +
    Number(bluedeath.value) +
    adjustedTotal -5;
  return Number(result.toFixed(2));
});

const redpoint = computed(() => {
  const totalValue = Number(redtotal.value);
  let adjustedTotal;
  if (totalValue <= 30) {
    adjustedTotal = totalValue / 4;
  } else {
    adjustedTotal = 30 / 4 + (totalValue - 30) / 6;
  }
  const result = Number(redcc1.value) +
    Number(redcc2.value) +
    Number(reddeath.value) +
    adjustedTotal -5;
  return Number(result.toFixed(2));
});
</script>

<style scoped>
.box1 {
  background-color: #48305f;
  color: white;
  text-align: center;
}
.stats {
  background-color: #48305f;
  color: #e0aaff;
  text-align: center;
}
.input1 {
  background-color: #614b78;
  border: none;
  margin: 0.1em;
  padding: 0.5em;
  border-radius: 0.3em;
  color: #fff;
}
</style>
