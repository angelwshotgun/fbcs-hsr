<template>
  <div class="p-card">
    <div class="flex gap-3">
      <div class="flex gap-3 justify-center items-center">
        <button @click="readFile" class="h-1/2">Read File</button>
        <button @click="writeFile" class="h-1/2">Write File</button>
      </div>
      <div v-if="fileContent">
        <h2>Lọc theo vận mệnh:</h2>
        <select v-model="selectedPath">
          <option value="">All Paths</option>
          <option v-for="path in uniquePaths" :key="path" :value="path">
            {{ path }}
          </option>
        </select>
      </div>
    </div>
    <h2>Nón ánh sáng:</h2>
      <ul>
        <li v-for="(character, id) in filteredCharacters" :key="id">
          <h3>{{ character.name }}</h3>
          <div class="flex">
            <div class="w-1/5">
              <NuxtImg
                :src="link + character.preview"
                class="object-contain w-40% h-auto"
              />
            </div>
            <div>
              <strong>Points:</strong>
              <input
                v-for="(point, index) in character.point"
                :key="index"
                type="number"
                v-model.number="fileContent[id].point[index]"
                step="0.25"
                min="-10"
                max="30"
              />
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const { $github } = useNuxtApp();
const fileContent = ref(null);
const selectedPath = ref("");
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const uniquePaths = computed(() => {
  if (!fileContent.value) return [];
  return [
    ...new Set(Object.values(fileContent.value).map((char) => char.path)),
  ];
});

const filteredCharacters = computed(() => {
  if (!fileContent.value) return {};
  if (!selectedPath.value) return fileContent.value;
  return Object.fromEntries(
    Object.entries(fileContent.value).filter(
      ([_, char]) => char.path === selectedPath.value
    )
  );
});

async function readFile() {
  try {
    const content = await $github.readFile(
      "angelwshotgun",
      "DataStore/data",
      "data/light_cones.json"
    );
    fileContent.value = JSON.parse(content);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function writeFile() {
  try {
    await $github.writeFile(
      "angelwshotgun",
      "DataStore/data",
      "data/light_cones.json",
      JSON.stringify(fileContent.value, null, 2),
      "Update file"
    );
    console.log("File written successfully");
  } catch (error) {
    console.error("Error writing file:", error);
  }
}
</script>

<style scoped>
input[type="number"] {
  width: 50px;
  margin-right: 5px;
}
select {
  margin-bottom: 20px;
}
</style>
