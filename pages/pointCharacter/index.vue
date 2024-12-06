<script setup>
import { ref, computed } from 'vue';

const fileContent = ref(null);
const selectedPath = ref('');
const selectedVersion = ref('12'); // New ref for version selection
const link = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
const error = ref(null);

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
  error.value = null;
  try {
    const response = await $fetch('/api/github/readCharacters', {
      method: 'POST',
      body: {
        action: 'readFile',
        owner: 'angelwshotgun',
        repo: 'DataStore',
        path: `data/characters${
          selectedVersion.value === '11' ? '11' : ''
        }.json`,
      },
    });
    if (response.error) {
      throw new Error(response.error);
    }
    fileContent.value = response.content;
    console.log(fileContent.value);
  } catch (err) {
    console.error('Error reading file:', err);
    error.value = err.message;
  }
}

async function writeFile() {
  error.value = null;
  try {
    const response = await $fetch('/api/github/readCharacters', {
      method: 'POST',
      body: {
        action: 'writeFile',
        owner: 'angelwshotgun',
        repo: 'DataStore',
        path: `data/characters${
          selectedVersion.value === '11' ? '11' : ''
        }.json`,
        content: JSON.stringify(fileContent.value, null, 2),
        message: 'Update file',
      },
    });
    if (response.error) {
      throw new Error(response.error);
    }
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
    error.value = err.message;
  }
}
</script>

<template>
  <div class="p-card">
    <div class="flex gap-3">
      <div class="flex gap-3 justify-center items-center">
        <select v-model="selectedVersion" class="h-1/2">
          <option value="12">Tầng 12</option>
          <option value="11">Tầng 11</option>
        </select>
        <Button @click="readFile" label="Read File" class="h-1/2" />
        <Button
          :disable="fileContent === null"
          @click="writeFile"
          label="Write File"
          class="h-1/2"
        />
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
    <div v-if="error" class="error-message">{{ error }}</div>
    <h2>Nhân vật:</h2>
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
              min="-30"
              max="30"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Your existing styles */
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
