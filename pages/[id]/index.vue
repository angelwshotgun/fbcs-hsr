<template>
  <ClientOnly v-if="store.$state.games[id]">
    <div>
      <!-- <video ref="videoPlayer" autoplay loop muted class="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <source :src="urlVideo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="fixed bottom-0 left-0 p-4 bg-gray-800 text-white rounded-md">
        <audio ref="audioPlayer" :src="currentTrack.src" controls></audio>
        <div class="flex items-center justify-between mt-2">
          <button @click="previousTrack">Previous</button>
          <div>{{ currentTrack.title }}</div>
          <button @click="nextTrack">Next</button>
        </div>
      </div> -->
      <NuxtImg
        v-if="viewData.name !== ''"
        :src="link + viewData.name"
        style="
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40%;
          height: 80vh;
          object-fit: cover;
          z-index: 99;
        "
      />
      <div class="flex flex-col md:flex-row justify-between gap-1 p-3">
        <div class="w-2/5 flex flex-col gap-1">
          <div
            class="flex justify-between items-center bg-blue-500 h-10 rounded-md"
          >
            <label class="pl-2 text-white text-xl">{{ team1 }}</label>
            <label class="pr-2 text-white text-xl">{{
              store.$state.games[id].state.point.bluep.char[0] +
              store.$state.games[id].state.point.bluep.char[1] +
              store.$state.games[id].state.point.bluep.char[2] +
              store.$state.games[id].state.point.bluep.char[3] +
              store.$state.games[id].state.point.bluep.char[4] +
              store.$state.games[id].state.point.bluep.char[5] +
              store.$state.games[id].state.point.bluep.char[6] +
              store.$state.games[id].state.point.bluep.char[7] +
              store.$state.games[id].state.point.bluep.lc[0] +
              store.$state.games[id].state.point.bluep.lc[1] +
              store.$state.games[id].state.point.bluep.lc[2] +
              store.$state.games[id].state.point.bluep.lc[3] +
              store.$state.games[id].state.point.bluep.lc[4] +
              store.$state.games[id].state.point.bluep.lc[5] +
              store.$state.games[id].state.point.bluep.lc[6] +
              store.$state.games[id].state.point.bluep.lc[7]
            }}</label>
          </div>
          <div class="grid grid-cols-3 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="true"
              :state="'bc1'"
              :stt="1"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="true"
              :state="'bc2'"
              :stt="8"
            />
            <SelectView
              :is-light-cone="true"
              :is-ban="true"
              :state="'bl1'"
              :stt="9"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c1'"
              :lcstate="'l1'"
              :index="0"
              :team="'blue'"
              :stt="3"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c2'"
              :lcstate="'l2'"
              :index="1"
              :team="'blue'"
              :stt="6"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c3'"
              :lcstate="'l3'"
              :index="2"
              :team="'blue'"
              :stt="12"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c4'"
              :lcstate="'l4'"
              :index="3"
              :team="'blue'"
              :stt="13"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c5'"
              :lcstate="'l5'"
              :index="4"
              :team="'blue'"
              :stt="16"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c6'"
              :lcstate="'l6'"
              :index="5"
              :team="'blue'"
              :stt="17"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c7'"
              :lcstate="'l7'"
              :index="6"
              :team="'blue'"
              :stt="20"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c8'"
              :lcstate="'l8'"
              :index="7"
              :team="'blue'"
              :stt="21"
            />
          </div>
        </div>
        <div class="w-1/4 flex flex-col items-center">
          <div class="flex items-center justify-center gap-1">
            <TimerView class="ml-15" />
            <Button
              label="Edit"
              @click="visible = true"
              class="w-1/2"
              severity="contrast"
              :outlined="true"
            />
          </div>
          <BanPickLabel class="mb-2" />
          <div class="overflow-y-auto h-[60vh]" v-show="isDropdownOpen">
            <div class="flex flex-col gap-4">
              <StatsInputs />
            </div>
          </div>
        </div>
        <div class="w-2/5 flex flex-col gap-1">
          <div
            class="flex justify-between items-center bg-red-500 h-10 rounded-md"
          >
            <label class="pl-2 text-white text-xl">{{
              store.$state.games[id].state.point.redp.char[0] +
              store.$state.games[id].state.point.redp.char[1] +
              store.$state.games[id].state.point.redp.char[2] +
              store.$state.games[id].state.point.redp.char[3] +
              store.$state.games[id].state.point.redp.char[4] +
              store.$state.games[id].state.point.redp.char[5] +
              store.$state.games[id].state.point.redp.char[6] +
              store.$state.games[id].state.point.redp.char[7] +
              store.$state.games[id].state.point.redp.lc[0] +
              store.$state.games[id].state.point.redp.lc[1] +
              store.$state.games[id].state.point.redp.lc[2] +
              store.$state.games[id].state.point.redp.lc[3] +
              store.$state.games[id].state.point.redp.lc[4] +
              store.$state.games[id].state.point.redp.lc[5] +
              store.$state.games[id].state.point.redp.lc[6] +
              store.$state.games[id].state.point.redp.lc[7]
            }}</label>
            <label class="pr-2 text-white text-xl">{{ team2 }}</label>
          </div>
          <div class="grid grid-cols-3 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="true"
              :state="'bc3'"
              :stt="2"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="true"
              :state="'bc4'"
              :stt="7"
            />
            <SelectView
              :is-ban="true"
              :is-light-cone="true"
              :state="'bl2'"
              :stt="10"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c9'"
              :lcstate="'l9'"
              :index="0"
              :team="'red'"
              :stt="4"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c10'"
              :lcstate="'l10'"
              :index="1"
              :team="'red'"
              :stt="5"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c11'"
              :lcstate="'l11'"
              :index="2"
              :team="'red'"
              :stt="11"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c12'"
              :lcstate="'l12'"
              :index="3"
              :team="'red'"
              :stt="14"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c13'"
              :lcstate="'l13'"
              :index="4"
              :team="'red'"
              :stt="15"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c14'"
              :lcstate="'l14'"
              :index="5"
              :team="'red'"
              :stt="18"
            />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c15'"
              :lcstate="'l15'"
              :index="6"
              :team="'red'"
              :stt="19"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c16'"
              :lcstate="'l16'"
              :index="7"
              :team="'red'"
              :stt="22"
            />
          </div>
        </div>
      </div>
      <Dialog
        v-model:visible="visible"
        modal
        header="Edit"
        :style="{ width: '60rem' }"
      >
        <div>
          <div class="space-y-4">
            <WheelOfName />
            <div class="flex justify-between">
              <div class="flex flex-col">
                <label class="mb-1 text-sm font-medium">Tên đội 1</label>
                <InputText
                  v-model="team1"
                  placeholder="Nhập tên đội 1"
                  class="p-2 border rounded"
                />
              </div>
              <div class="flex flex-col">
                <label class="mb-1 text-sm font-medium">Tên đội 2</label>
                <InputText
                  v-model="team2"
                  placeholder="Nhập tên đội 2"
                  class="p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-5 pt-5">
          <Button label="Reset" @click="resetData()" />
          <Select
            v-model="selectedStage"
            :options="optionStage"
            option-label="label"
            option-value="value"
            @change="changeStage()"
          />
        </div>
      </Dialog>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useStore } from '~/store/useStore';
const team1 = ref('Blue Team');
const team2 = ref('Red Team');
const visible = ref(false);
const route = useRoute();
const store = useStore();
const id = route.params.id;
const link = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
const optionStage = [
  {
    label: 'Tầng 12',
    value: 12,
  },
  {
    label: 'Tầng 11',
    value: 11,
  },
];
const selectedStage = ref(12);
const stage = computed(() => {
  return store.$state.games[id]?.stage ?? null;
});
const resetData = () => {
  store.resetGameData(id);
};
const changeStage = () => {
  resetData();
  store.updateGameData(`${id}`, 'stage', selectedStage.value);
};
watch(stage, (newVal) => {
  if (stage.value) {
    selectedStage.value = newVal;
  }
});

const isDropdownOpen = ref(false);

const banpick = computed(() => {
  return store.$state.games[id]?.banpick ?? null;
});
watch(banpick, () => {
  if (banpick.value > 22) {
    isDropdownOpen.value = true;
  } else {
    isDropdownOpen.value = false;
  }
});
const viewData = computed(() => {
  return store.$state.games[id]?.state.data ?? null;
});
</script>
<style scoped>
video {
  object-fit: cover;
  object-position: right;
  clip-path: circle(25% at 75% 50%);
  transform: translateX(-25%);
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.-z-10 {
  z-index: -10;
}

.z-10 {
  z-index: 10;
}

/* Responsive media queries */
@media (max-width: 1024px) {
  video {
    object-position: center;
    clip-path: circle(40% at 50% 50%);
    /* Điều chỉnh vị trí và kích thước clip-path */
    transform: translateX(0);
    /* Xoá translate nếu cần */
  }
}

@media (max-width: 768px) {
  video {
    clip-path: circle(50% at 50% 50%);
  }
}

@media (max-width: 480px) {
  video {
    object-position: center;
    clip-path: circle(60% at 50% 50%);
  }
}
</style>
