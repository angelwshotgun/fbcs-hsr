<template>
  <div>
    <InputText
      placeholder="Nhập tên nhân vật"
      class="w-full"
      v-model="searchQuery"
    />
    <div class="grid grid-cols-6 w-fit gap-1 bg-primary">
      <div v-for="(value, key) in filteredCharacters" :key="key">
        <NuxtImg
          :src="link + value.icon"
          class="w-full h-auto object-cover"
          @click="handleSelectCharacter(value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";
import { ref, computed, onMounted } from "vue";

const store = useStore();
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";
const { data } = await useFetch("/api/characters");
const characters = data.value;
// Search query ref
const searchQuery = ref("");

// Computed property to filter characters based on searchQuery
const filteredCharacters = computed(() => {
  const characterArray = Object.values(characters); // Convert object to array
  if (!searchQuery.value) {
    return characterArray; // Return all characters if no search query
  }
  return characterArray.filter(character => 
    character.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  store.initializeRealtimeListeners();
});

const handleSelectCharacter = async (value) => {
  console.log(store.$state)
  if(store.$state.state.name === "pick"){
    await store.pickCharacter(value);
  }
  else if(store.$state.state.name === "ban"){
    store.banCharacter(value);
  }
};
</script>
