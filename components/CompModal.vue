<template>
  <ClientOnly v-if="store.$state.games[id]">
    <Dialog
      v-model:visible="visible"
      modal
      header="Xem điểm"
      :style="{ width: '80rem', height: '80rem' }"
      @hide="closeModal"
    >
      <div class="flex flex-col flex justify-center items-center">
        <div class="flex w-5/6 gap-10 px-50">
          <div
            v-for="index in 4"
            :key="index - 1"
            @click="count = index - 1"
            class="flex-1 hover:cursor-pointer transition-all duration-300"
            :class="[
              count === index - 1
                ? 'ring-4 ring-blue-500 rounded-lg shadow-lg scale-105 neon-border'
                : 'hover:shadow hover:scale-102',
            ]"
          >
            <div class="w-full pb-100% relative">
              <NuxtImg
                v-if="char[index - 1].icon !== ''"
                :src="link + char[index - 1].icon"
                :alt="char[index - 1].name"
                class="absolute inset-0 w-full h-full object-cover bg-primary rounded-t-lg"
              />
            </div>
            <div class="text-center mt-2 font-medium">
              {{ char[index - 1].name ?? '' }}
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-y-auto h-[60vh] pt-5">
        <div class="grid grid-cols-16 gap-1">
          <div
            v-for="item in characters"
            :key="item.name"
            class="flex flex-col items-center bg-primary rounded overflow-hidden"
          >
            <div class="w-full pb-[100%] relative">
              <NuxtImg
                v-if="item.icon !== ''"
                :src="link + item.icon"
                :alt="item.name"
                @click="select(item)"
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%] object-cover transition-transform duration-200 ease-in-out"
                @mouseenter="$event.target.classList.add('scale-110')"
                @mouseleave="$event.target.classList.remove('scale-110')"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </ClientOnly>
</template>

<script setup>
import { useStore } from '~/store/useStore';
const count = ref(0);
const route = useRoute();
const store = useStore();
const id = route.params.id;
const link = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
const visible = ref(false);
const searchQuery = ref('');
const props = defineProps({
  display: Boolean,
  characters: Object,
  light_cones: Object,
});
const char = ref([
  { name: '', eiloidon: [], lightcone: [], icon: '' },
  { name: '', eiloidon: [], lightcone: [], icon: '' },
  { name: '', eiloidon: [], lightcone: [], icon: '' },
  { name: '', eiloidon: [], lightcone: [], icon: '' },
]);
const selectedEiloidon = ref([]);
const selectedLightcone = ref([
  { name: '', eiloidon: [], lightcone: [], icon: '' },
  { name: '', eiloidon: [], lightcone: [], icon: '' },
  { name: '', eiloidon: [], lightcone: [], icon: '' },
  { name: '', eiloidon: [], lightcone: [], icon: '' },
]);
const selectedImpose = ref([]);
const characters = ref(props.characters);
const light_cones = ref(props.light_cones);
watch(props, (newVal) => {
  characters.value = newVal.characters;
  light_cones.value = newVal.light_cones;
});
const emit = defineEmits(['close']);
const selectedStage = computed(() => {
  return store.$state.stage;
});
const closeModal = () => {
  emit('close');
};

const filteredCharacters = computed(() => {
  if (!characters.value) return [];
  return characters.value.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredLightCones = computed(() => {
  if (!light_cones.value) return [];
  return light_cones.value.filter((lightCone) =>
    lightCone.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

watch(selectedStage, () => {
  loadData();
});
watch(
  () => props.display,
  (newVal) => {
    visible.value = newVal;
  },
  { immediate: true }
);

const reset = () => {
  char.value = [
    { name: '', eiloidon: [], lightcone: [], icon: '' },
    { name: '', eiloidon: [], lightcone: [], icon: '' },
    { name: '', eiloidon: [], lightcone: [], icon: '' },
    { name: '', eiloidon: [], lightcone: [], icon: '' },
  ];
  selectedEiloidon.value = [0, 0, 0, 0];
  selectedImpose.value = [0, 0, 0, 0];
  selectedLightcone.value = [
    { name: '', eiloidon: [], lightcone: [], icon: '' },
    { name: '', eiloidon: [], lightcone: [], icon: '' },
    { name: '', eiloidon: [], lightcone: [], icon: '' },
    { name: '', eiloidon: [], lightcone: [], icon: '' },
  ];
  count.value = 0;
};
const select = (item) => {
  char.value[count.value] = item;
  if (
    char.value[0].name == '' ||
    char.value[1].name == '' ||
    char.value[2].name == '' ||
    char.value[3].name == ''
  ) {
    count.value++;
  } else {
    count.value = 4;
  }
};
</script>

<style>
.neon-border {
  border: 1px solid rgba(0, 255, 255, 0.5);
  box-shadow: rgb(255, 255, 255) 0px 0px 0.2rem,
    rgb(255, 255, 255) 0px 0px 0.1rem, rgba(0, 255, 255, 0.5) 0px 0px 1rem,
    rgba(0, 255, 255, 0.5) 0px 0px 0.4rem, rgba(0, 255, 255, 0.5) 0px 0px 1rem,
    rgba(0, 255, 255, 0.5) 0px 0px 0.7rem inset;
}
</style>