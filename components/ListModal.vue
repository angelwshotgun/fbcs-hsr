<template>
  <ClientOnly v-if="store.$state.games[id]">
    <Dialog
      v-model:visible="visible"
      modal
      header="Xem điểm"
      :style="{ width: '80rem', height: '80rem' }"
      @hide="closeModal"
    >
      <div class="mb-4">
        <InputText
          v-model="searchQuery"
          placeholder="Tìm kiếm"
          class="w-full"
        />
      </div>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Nhân vật</Tab>
          <Tab value="1">Nón ánh sáng</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div v-if="filteredCharacters">
              <div v-for="character in filteredCharacters" :key="character.id">
                <h3>{{ character.name }}</h3>
                <div class="flex">
                  <div class="w-1/5">
                    <NuxtImg
                      :src="link + character.preview"
                      class="object-contain w-40% h-auto"
                    />
                  </div>
                  <div>
                    <table class="border-collapse">
                      <thead>
                        <tr>
                          <th
                            v-for="(_, index) in character.point"
                            :key="index"
                            class="px-4"
                          >
                            E{{ index }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            v-for="(value, index) in character.point"
                            :key="index"
                            class="px-4"
                          >
                            {{ value }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div v-if="filteredLightCones">
              <div v-for="lightCone in filteredLightCones" :key="lightCone.id">
                <h3>{{ lightCone.name }}</h3>
                <div class="flex">
                  <div class="w-1/5">
                    <NuxtImg
                      :src="link + lightCone.preview"
                      class="object-contain w-40% h-auto"
                    />
                  </div>
                  <div>
                    <table class="border-collapse">
                      <thead>
                        <tr>
                          <th
                            v-for="(_, index) in lightCone.point"
                            :key="index"
                            class="px-4"
                          >
                            S{{ index + 1 }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            v-for="(value, index) in lightCone.point"
                            :key="index"
                            class="px-4"
                          >
                            {{ value }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dialog>
  </ClientOnly>
</template>

<script setup>
import { useStore } from '~/store/useStore';

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
const characters = ref(props.characters);
const light_cones = ref(props.light_cones);
watch(props, (newVal) => {
  characters.value = newVal.characters;
  light_cones.value = newVal.light_cones;
})
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
</script>
