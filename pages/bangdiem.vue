<template>
  <div>
    <div class="card">
      <Tabs value="0">
        <TabList>
          <Tab value="0">Nhân vật 11</Tab>
          <Tab value="1">Nhân vật 12</Tab>
          <Tab value="2">Nón ánh sáng 11</Tab>
          <Tab value="3">Nón ánh sáng 12</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <DataTable :value="characters11">
              <Column header="Tên nhân vật">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <label class="min-w-[100px]">{{ slotProps.data.name }}</label>
                    <NuxtImg
                      :src="link + slotProps.data.preview"
                      class="w-[50px]"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Vận mệnh">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <NuxtImg
                      :src="
                        link + 'icon/path/' + slotProps.data.path + '.png'
                      "
                      class="w-[40px] brightness-0"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Thuộc tính">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <NuxtImg
                      :src="
                        link + 'icon/element/' + slotProps.data.element + '.png'
                      "
                      class="w-[40px]"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 0">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[0] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 1">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[1] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 2">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[2] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 3">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[3] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 4">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[4] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 5">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[5] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 6">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[6] }}
                  </div>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
          <TabPanel value="1">
            <DataTable :value="characters12">
              <Column header="Tên nhân vật">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <label class="min-w-[100px]">{{ slotProps.data.name }}</label>
                    <NuxtImg
                      :src="link + slotProps.data.preview"
                      class="w-[50px]"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Vận mệnh">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <NuxtImg
                      :src="
                        link + 'icon/path/' + slotProps.data.path + '.png'
                      "
                      class="w-[40px] brightness-0"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Thuộc tính">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <NuxtImg
                      :src="
                        link + 'icon/element/' + slotProps.data.element + '.png'
                      "
                      class="w-[40px]"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 0">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[0] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 1">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[1] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 2">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[2] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 3">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[3] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 4">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[4] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 5">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[5] }}
                  </div>
                </template>
              </Column>
              <Column header="Tinh hồn 6">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[6] }}
                  </div>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
          <TabPanel value="2">
            <DataTable :value="lightcones11">
              <Column header="Tên nón ánh sáng">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <label class="min-w-[250px]">{{ slotProps.data.name }}</label>
                    <NuxtImg
                      v-if="slotProps.data.preview"
                      :src="link + slotProps.data.preview"
                      class="w-[50px]"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Vận mệnh">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <NuxtImg
                      :src="
                        link + 'icon/path/' + slotProps.data.path + '.png'
                      "
                      class="w-[40px] brightness-0"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 1">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[0] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 2">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[1] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 3">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[2] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 4">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[3] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 5">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[4] }}
                  </div>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
          <TabPanel value="3">
            <DataTable :value="lightcones12">
              <Column header="Tên nón ánh sáng">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <label class="min-w-[250px]">{{ slotProps.data.name }}</label>
                    <NuxtImg
                      :src="link + slotProps.data.preview"
                      class="w-[50px]"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Vận mệnh">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <NuxtImg
                      :src="
                        link + 'icon/path/' + slotProps.data.path + '.png'
                      "
                      class="w-[40px] brightness-0"
                    />
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 1">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[0] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 2">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[1] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 3">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[2] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 4">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[3] }}
                  </div>
                </template>
              </Column>
              <Column header="Tích tầng 5">
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.data.point[4] }}
                  </div>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'white-layout',
});
const link = '/';
const characters12 = ref([]);
const characters11 = ref([]);
const lightcones12 = ref([]);
const lightcones11 = ref([]);

const fetchCharacters12 = async () => {
  try {
    const response = await fetch('/api/characters');
    characters12.value = await response.json();
    characters12.value = Object.values(characters12.value);
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};
const fetchCharacters11 = async () => {
  try {
    const response = await fetch('/api/characters11');
    characters11.value = await response.json();
    characters11.value = Object.values(characters11.value);
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};
const fetchLightcones12 = async () => {
  try {
    const response = await fetch('/api/light_cones');
    lightcones12.value = await response.json();
    lightcones12.value = Object.values(lightcones12.value).filter(lightcone => lightcone.rarity === 5);
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};
const fetchLightcones11 = async () => {
  try {
    const response = await fetch('/api/light_cones11');
    lightcones11.value = await response.json();
    lightcones11.value = Object.values(lightcones11.value).filter(lightcone => lightcone.rarity === 5);
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};
const fetchData = async () => {
  await fetchCharacters12();
  await fetchCharacters11();
  await fetchLightcones12();
  await fetchLightcones11();
};
onMounted(fetchData);
</script>

<style>
.p-datatable-column-header-content {
  justify-content: center;
}
</style>
