<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between gap-1 p-4">
      <div class="w-800px flex flex-col gap-1">
        <div class="flex justify-between items-center bg-blue-500 h-10 rounded-md">
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
        <div class="grid grid-cols-3 gap-1">
          <SelectView :is-light-cone="false" :is-ban="true" :state="'bc1'" />
          <SelectView :is-light-cone="false" :is-ban="true" :state="'bc2'" />
          <SelectView :is-light-cone="true" :is-ban="true" :state="'bl1'" />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c1'"
            :lcstate="'l1'"
            :index="0" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c2'"
            :lcstate="'l2'"
            :index="1" :team="'blue'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c3'"
            :lcstate="'l3'"
            :index="2" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c4'"
            :lcstate="'l4'"
            :index="3" :team="'blue'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c5'"
            :lcstate="'l5'"
            :index="4" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c6'"
            :lcstate="'l6'"
            :index="5" :team="'blue'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c7'"
            :lcstate="'l7'"
            :index="6" :team="'blue'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c8'"
            :lcstate="'l8'"
            :index="7" :team="'blue'"
          />
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <RollButton />
        </div>
        <div class="pb-1">
          <BanPickLabel />
        </div>
        <div>
          <StatsInputs />
        </div>
        <div class="flex justify-center">
          <Button label="Reset" @click="resetData()" />
        </div>
      </div>
      <div class="w-800px flex flex-col gap-1">
        <div class="flex justify-between items-center bg-red-500 h-10 rounded-md">
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
        <div class="grid grid-cols-3 gap-1">
          <SelectView :is-light-cone="false" :is-ban="true" :state="'bc3'" />
        <SelectView :is-light-cone="false" :is-ban="true" :state="'bc4'" />
        <SelectView :is-ban="true" :is-light-cone="true" :state="'bl2'" />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c9'"
            :lcstate="'l9'"
            :index="0" :team="'red'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c10'"
            :lcstate="'l10'"
            :index="1" :team="'red'"

          />
        </div>        
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c11'"
            :lcstate="'l11'"
            :index="2" :team="'red'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c12'"
            :lcstate="'l12'"
            :index="3" :team="'red'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c13'"
            :lcstate="'l13'"
            :index="4" :team="'red'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c14'"
            :lcstate="'l14'"
            :index="5" :team="'red'"
          />
        </div>
        <div class="grid grid-cols-2 gap-1">
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c15'"
            :lcstate="'l15'"
            :index="6" :team="'red'"
          />
          <SelectView
            :is-light-cone="false"
            :is-ban="false"
            :state="'c16'"
            :lcstate="'l16'"
            :index="7" :team="'red'"
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
  store.startTimer();
};

onMounted(() => {
  store.initializeRealtimeListeners();
});

</script>
