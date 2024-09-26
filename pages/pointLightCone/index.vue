<template>
    <div>
      <h1>Character Point</h1>
      <div v-for="(light_cone, id) in light_cones" :key="id">
        <div v-if="light_cone.rarity==5">
            <h2>{{ light_cone.name }}</h2>
            <InputNumber v-model="light_cone.point[0]" :minFractionDigits="0" :maxFractionDigits="1"/>
            <InputNumber v-model="light_cone.point[1]" :minFractionDigits="0" :maxFractionDigits="1"/>
            <InputNumber v-model="light_cone.point[2]" :minFractionDigits="0" :maxFractionDigits="1"/>
            <InputNumber v-model="light_cone.point[3]" :minFractionDigits="0" :maxFractionDigits="1"/>
            <InputNumber v-model="light_cone.point[4]" :minFractionDigits="0" :maxFractionDigits="1"/>
            <Button @click="updateLightconesPoint()">Update</Button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCharacterStore } from '~/store/useCharacterStore';
  
  const characterStore = useCharacterStore();
  await characterStore.loadLightCone();
  
  const light_cones = characterStore.light_cones.data;
  
  const newPoints = ref([]);
  newPoints.value = Object.values(light_cones).map((light_cone) => light_cone.point);
  const updateLightconesPoint = () => {
    characterStore.saveLightconesToFile();
  };
  </script>
  
  <style>
  input {
    width: 45px;
    text-align: center;
  }
  </style>