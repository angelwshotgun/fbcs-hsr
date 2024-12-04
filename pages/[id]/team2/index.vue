<template>
  <ClientOnly v-if="store.$state.games[id]">
    <div class="flex flex-col md:flex-row justify-between gap-1">
      <div class="w-1/3 flex flex-col gap-1">
        <div class="w-auto flex flex-col gap-1">
          <div
            class="flex justify-between items-center bg-blue-500 h-10 rounded-md"
          >
            <label class="pl-2 text-white text-xl">Blue Team</label>
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
              :index="0"
              :team="'blue'"
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c2'"
              :lcstate="'l2'"
              :index="1"
              :team="'blue'"
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
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c4'"
              :lcstate="'l4'"
              :index="3"
              :team="'blue'"
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
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c6'"
              :lcstate="'l6'"
              :index="5"
              :team="'blue'"
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
            />
            <SelectView
              :is-light-cone="false"
              :is-ban="false"
              :state="'c8'"
              :lcstate="'l8'"
              :index="7"
              :team="'blue'"
            />
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex justify-center items-center">
          <Button label="Xem điểm" @click="display = true" />
          <TimerPlayer />
          <Button label="Xem đội hình" @click="display1 = true" />
        </div>
        <div class="pb-1">
          <BanPickLabel />
        </div>
        <InputText
          v-model="search"
          placeholder="Tìm kiếm..."
          class="w-full mb-1"
        />
        <div class="overflow-y-auto h-[60vh]">
          <!-- Add a wrapper for scroll -->
          <div class="grid grid-cols-6 gap-1">
            <div
              v-for="item in filterCharacters"
              :key="item.id"
              class="flex flex-col items-center bg-primary rounded overflow-hidden"
            >
              <div class="w-full pb-[100%] relative">
                <div v-if="!charactersFilter.includes(item.name)">
                  <NuxtImg
                    v-if="item.preview !== ''"
                    :src="link + item.preview"
                    :alt="item.name"
                    class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] object-cover transition-transform duration-200 ease-in-out"
                    @click="selectCharacter(item)"
                    @mouseenter="$event.target.classList.add('scale-110')"
                    @mouseleave="$event.target.classList.remove('scale-110')"
                  />
                </div>
                <div v-else>
                  <NuxtImg
                    v-if="item.preview !== ''"
                    :src="link + item.preview"
                    :alt="item.name"
                    style="filter: grayscale(100%)"
                    class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] object-cover transition-transform duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <Button
            :severity="team === 2 && isSelected === true ? '' : 'secondary'"
            label="Khóa"
            class="w-1/4"
            @click="lockCharacter"
          />
        </div>
      </div>
      <div class="w-1/3 flex flex-col gap-1">
        <div
          class="flex justify-between items-center bg-red-500 h-10 rounded-md"
        >
          <label class="pl-2 text-white text-xl">Red Team</label>
          <label class="pr-2 text-white text-xl">{{
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
        </div>
        <SelectOptions
          :is-light-cone="false"
          :is-ban="true"
          :state="'bc3'"
          :index="0"
          :team="'red'"
          :data="data"
          :stt="2"
          :characters="characters"
          :filterCharacters="filterCharacters"
          :light_cones="light_cones"
          :light_cones34="light_cones34"
        />
        <div class="flex">
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c9'"
            :lcstate="'l9'"
            :index="0"
            :team="'red'"
            :data="data"
            :stt="4"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c10'"
            :lcstate="'l10'"
            :index="1"
            :team="'red'"
            :data="data"
            :stt="5"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
        </div>
        <SelectOptions
          :is-light-cone="false"
          :is-ban="true"
          :state="'bc4'"
          :data="data"
          :stt="7"
          :characters="characters"
          :filterCharacters="filterCharacters"
          :light_cones="light_cones"
          :light_cones34="light_cones34"
        />
        <SelectOptions
          :is-light-cone="true"
          :is-ban="true"
          :state="'bl2'"
          :data="data"
          :stt="10"
          :characters="characters"
          :filterCharacters="filterCharacters"
          :light_cones="light_cones"
          :light_cones34="light_cones34"
        />
        <div class="flex">
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c11'"
            :lcstate="'l11'"
            :index="2"
            :team="'red'"
            :data="data"
            :stt="11"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c12'"
            :lcstate="'l12'"
            :index="3"
            :team="'red'"
            :data="data"
            :stt="14"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
        </div>
        <div class="flex">
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c13'"
            :lcstate="'l13'"
            :index="4"
            :team="'red'"
            :data="data"
            :stt="15"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c14'"
            :lcstate="'l14'"
            :index="5"
            :team="'red'"
            :data="data"
            :stt="18"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
        </div>
        <div class="flex">
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c15'"
            :lcstate="'l15'"
            :index="6"
            :team="'red'"
            :data="data"
            :stt="19"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
          <SelectOptions
            :is-light-cone="false"
            :is-ban="false"
            :state="'c16'"
            :lcstate="'l16'"
            :index="7"
            :team="'red'"
            :data="data"
            :stt="22"
            :characters="characters"
            :filterCharacters="filterCharacters"
            :light_cones="light_cones"
            :light_cones34="light_cones34"
          />
        </div>
      </div>
    </div>
    <ListModal
      :display="display"
      @close="display = false"
      :characters="characters"
      :filterCharacters="filterCharacters"
      :light_cones="light_cones"
    />
    <CompModal
      :display="display1"
      @close="display1 = false"
      :characters="characters"
      :light_cones="light_cones"
    />
  </ClientOnly>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const store = useStore();
const route = useRoute();
const id = route.params.id;
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const display = ref(false);
const display1 = ref(false);
const search = ref("");

// Khởi tạo các ref với giá trị ban đầu là null
const characters = ref(null);
const filterCharacters = ref(null);
const light_cones = ref(null);
const light_cones34 = ref(null);
const data = ref(null);
const isSelected = ref(false);

// Khởi tạo selectedStage với giá trị null
const selectedStage = ref(null);
const stage = computed(() => {
  return store.$state.games[id]?.stage ?? null;
});
const charactersFilter = computed(() => {
  return [
    store.$state.games[id]?.character.c1.name ?? null,
    store.$state.games[id]?.character.c2.name ?? null,
    store.$state.games[id]?.character.c3.name ?? null,
    store.$state.games[id]?.character.c4.name ?? null,
    store.$state.games[id]?.character.c5.name ?? null,
    store.$state.games[id]?.character.c6.name ?? null,
    store.$state.games[id]?.character.c7.name ?? null,
    store.$state.games[id]?.character.c8.name ?? null,
    store.$state.games[id]?.character.c9.name ?? null,
    store.$state.games[id]?.character.c10.name ?? null,
    store.$state.games[id]?.character.c11.name ?? null,
    store.$state.games[id]?.character.c12.name ?? null,
    store.$state.games[id]?.character.c13.name ?? null,
    store.$state.games[id]?.character.c14.name ?? null,
    store.$state.games[id]?.character.c15.name ?? null,
    store.$state.games[id]?.character.c16.name ?? null,
    store.$state.games[id]?.ban.bc1.name ?? null,
    store.$state.games[id]?.ban.bc2.name ?? null,
    store.$state.games[id]?.ban.bc3.name ?? null,
    store.$state.games[id]?.ban.bc4.name ?? null,
  ];
});
watch(stage, (newVal) => {
  if (stage.value) {
    selectedStage.value = newVal;
    fetchLightcones();
    fetchCharacters();
  }
});

// Các hàm fetch data giữ nguyên logic
async function fetchCharacters() {
  try {
    const response = await $fetch("/api/github/readCharacters", {
      method: "POST",
      body: {
        action: "readFile",
        owner: "angelwshotgun",
        repo: "DataStore",
        path: `data/characters${selectedStage.value === 11 ? "11" : ""}.json`,
      },
    });
    if (response.error) {
      throw new Error(response.error);
    }
    characters.value = Object.values(response.content);
    filterCharacters.value = Object.values(response.content);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

async function fetchLightcones() {
  try {
    const response = await $fetch("/api/github/readCharacters", {
      method: "POST",
      body: {
        action: "readFile",
        owner: "angelwshotgun",
        repo: "DataStore",
        path: `data/light_cones${selectedStage.value === 11 ? "11" : ""}.json`,
      },
    });
    if (response.error) {
      throw new Error(response.error);
    }
    light_cones.value = Object.values(response.content);
    // light_cones.value = Object.values(response.content).filter(
    //   (item) => item.rarity === 5
    // );
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

// async function fetchLightcones34() {
//   const response = await fetch('/api/light_cones');
//   const data = await response.json();
//   light_cones34.value = Object.values(data);
// }

// Hàm load data
const loadData = async () => {
  await fetchCharacters();
  await fetchLightcones();
  // await fetchLightcones34();
};

// Sử dụng onMounted để load data và cập nhật các biến
onMounted(async () => {
  if (store.$state.games && store.$state.games[id]) {
    selectedStage.value = store.$state.games[id].stage;
  }
  await fetchCharacters();
  await fetchLightcones();
  // await fetchLightcones34();
});

// Sử dụng computed để lấy giá trị từ store, với giá trị mặc định là null
const banpick = computed(() => {
  return store.$state.games[id]?.banpick ?? null;
});

const team = computed(() => {
  return store.$state.games[id]?.team ?? null;
});

// Watch selectedStage để load lại data khi stage thay đổi
watch(selectedStage, async (newStage) => {
  if (newStage !== null) {
    await loadData();
  }
});

// Các watch khác cần kiểm tra dữ liệu trước khi sử dụng
watch(banpick, (newVal) => {
  // Kiểm tra xem dữ liệu đã được load chưa
  if (!characters.value || !light_cones.value) return;

  if (newVal === 10) {
    filterCharacters.value = light_cones.value.filter((item) =>
      item.name.toLowerCase().includes(search.value?.toLowerCase() || "")
    );
  } else {
    filterCharacters.value = characters.value.filter((item) =>
      item.name.toLowerCase().includes(search.value?.toLowerCase() || "")
    );
  }
});

watch(search, (newValue) => {
  // Kiểm tra xem dữ liệu đã được load chưa
  if (!characters.value || !light_cones.value) return;

  if (banpick.value === 10) {
    filterCharacters.value = light_cones.value.filter((item) =>
      item.name.toLowerCase().includes(newValue.toLowerCase())
    );
  } else {
    filterCharacters.value = characters.value.filter((item) =>
      item.name.toLowerCase().includes(newValue.toLowerCase())
    );
  }
});

const selectCharacter = (item) => {
  if (team.value === 2) {
    data.value = item;
    isSelected.value = true;
  }
};

const lockCharacter = () => {
  if (team.value === 2 && isSelected.value === true) {
    store.updateGameData(`${id}`, "banpick", banpick.value + 1);
    store.updateGameData(`${id}`, `state/data/name`, "");
    isSelected.value = false;
  }
};
</script>
