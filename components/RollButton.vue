<template>
    <div
      class="box flex flex-col items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-#64477c duration-300"
      @click="$emit('click')"
    >
      <label>{{ rollNumber }}</label>
      <label>Roll for {{ team }}</label>
    </div>
  </template>
  
  <script setup>
  defineProps({
    rollNumber: {
      type: Number,
      required: true
    },
    team: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .box {
    border: 2px solid #64477c;
    border-radius: 0.5em;
    color: white;
    width: fit-content;
    padding: 1em;
    margin: 1em;
    cursor: pointer;
  }
  </style>