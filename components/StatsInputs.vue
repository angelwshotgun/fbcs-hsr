<template>
    <div class="flex justify-center my-3 rounded-lg">
      <div class="layout-point flex justify-center flex-gap-1 bg-primary w-fit">
        <div class="box1 stats flex flex-col m-2" v-for="team in ['Blue', 'Red']" :key="team">
          <label class="text-white">{{ team }} Team</label>
          <input v-for="(placeholder, index) in inputs" :key="index" type="text" :placeholder="placeholder" class="input1"/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const inputs = [
    "Phase 1 Cycles",
    "Phase 2 Cycles",
    "Deaths",
    "Point"
  ];
  </script>
  
  <style scoped>
  .box1 {
    background-color: #48305f;
    color: white;
    text-align: center;
  }
  .stats {
    background-color: #48305f;
    color: #e0aaff;
    text-align: center;
  }
  .input1 {
    background-color: #614b78;
    border: none;
    margin: .1em;
    padding: .5em;
    border-radius: .3em;
    color: #fff;
  }
  </style>