<template>
  <div class="pl-[200px] flex flex-col gap-3">
    <div
      v-for="(item, index) in asta.AVList"
      :key="item.value"
      class="flex gap-3"
    >
      <div>
        {{ item }}
      </div>
      <Button label="Move" @click="onMove(item)" />
      <Button v-if="index === 0" label="skill" @click="onSkill(item)" />
    </div>
  </div>
</template>

<script setup>
import Asta from '~/utils/Asta';
const asta = new Asta();
for (let i = 0; i <= 29; i++) {
  asta.AVList.push(asta.currentSpeed * i);
}
asta.ultimate();
console.log(asta);
</script>
