<template>
  <div>
    <h1>Character Point</h1>
    <div v-for="(character, id) in characters" :key="id">
      <h2>{{ character.name }}</h2>
      <InputNumber v-model="character.point[0]" :minFractionDigits="0" :maxFractionDigits="1"/>
      <InputNumber v-model="character.point[1]" :minFractionDigits="0" :maxFractionDigits="1"/>
      <InputNumber v-model="character.point[2]" :minFractionDigits="0" :maxFractionDigits="1"/>
      <InputNumber v-model="character.point[3]" :minFractionDigits="0" :maxFractionDigits="1"/>
      <InputNumber v-model="character.point[4]" :minFractionDigits="0" :maxFractionDigits="1"/>
      <InputNumber v-model="character.point[5]" :minFractionDigits="0" :maxFractionDigits="1"/>
      <InputNumber v-model="character.point[6]" :minFractionDigits="0" :maxFractionDigits="1"/>
      <Button @click="updateCharacterPoint()">Update</Button>
    </div>
  </div>
</template>

<script setup>
import { useCharacterStore } from '~/store/useCharacterStore';

const characterStore = useCharacterStore();
await characterStore.loadCharacters();

const characters = characterStore.characters.data;
const newPoints = ref([]);
newPoints.value = Object.values(characters).map((character) => character.point);
const updateCharacterPoint = () => {
  characterStore.saveCharactersToFile();
};
</script>

<style>
input {
  width: 45px;
  text-align: center;
}
</style>