<template>
  <div>
    <div class="flex justify-between gap-1">
      <div class="w-2/5 flex flex-col gap-1">
        <div class="flex justify-between items-center bg-blue h-10 rounded-md">
          <label class="pl-2 text-white text-xl">Blue Team</label>
          <label class="pr-2 text-white text-xl">{{
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
          }}</label>
        </div>
        <div class="flex gap-1 w-1/2">
          <SelectView :is-light-cone="false" :is-ban="true" :state="'bc1'" />
          <SelectView :is-light-cone="false" :is-ban="true" :state="'bc2'" />
          <SelectView :is-light-cone="true" :is-ban="true" :state="'bl1'" />
        </div>
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c1'"
            :lcstate="'l1'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c2'"
            :lcstate="'l2'"
          />
        </div>
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c3'"
            :lcstate="'l3'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c4'"
            :lcstate="'l4'"
          />
        </div>
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c5'"
            :lcstate="'l5'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c6'"
            :lcstate="'l6'"
          />
        </div>
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c7'"
            :lcstate="'l7'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c8'"
            :lcstate="'l8'"
          />
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div>
          <RollButton />
        </div>
        <div>
          <StatsInputs />
        </div>
        <div class="flex justify-center">
          <Button label="Reset" @click="resetData()" />
        </div>
      </div>
      <div class="w-2/5 flex flex-col gap-1">
        <div class="flex justify-between items-center bg-red h-10 rounded-md">
          <label class="pl-2 text-white text-xl">Red Team</label>
          <label class="pr-2 text-white text-xl">{{
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
          }}</label>
        </div>
        <SelectView :is-light-cone="false" :is-ban="true" :state="'bc3'" />
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c9'"
            :lcstate="'l9'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c10'"
            :lcstate="'l10'"
          />
        </div>
        <SelectView :is-light-cone="false" :is-ban="true" :state="'bc4'" />
        <SelectView :is-ban="true" :is-light-cone="true" :state="'bl2'" />
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c11'"
            :lcstate="'l11'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c12'"
            :lcstate="'l12'"
          />
        </div>
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c13'"
            :lcstate="'l13'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c14'"
            :lcstate="'l14'"
          />
        </div>
        <div class="flex gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c15'"
            :lcstate="'l15'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c16'"
            :lcstate="'l16'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const store = useStore();

const resetData = () => {
  store.resetGameData();
};

onMounted(() => {
  store.initializeRealtimeListeners();
});
</script>
