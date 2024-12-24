<template>
  <div v-if="aug" class="augment-item rounded-lg overflow-hidden shadow-lg">
    <div class="augment-img h-60%">
      <NuxtImg :src="aug.image" class="w-full h-full object-contain" />
      <div class="augment-name flex items-center justify-center text-center">
        <h3>{{ aug.name }}</h3>
      </div>
    </div>
    <div
      class="augment-text h-40% flex items-center justify-center text-center"
    >
      <div class="augment-info m-2">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/store/useStore';

const route = useRoute();
const store = useStore();
const id = route.params.id;

const props = defineProps({
  team: {
    type: String,
    required: true,
  },
});
const aug = computed(() => {
  if (props.team === 'blue') {
    return store.$state.games[id]?.augment.teamblue ?? null;
  } else {
    return store.$state.games[id]?.augment.teamred ?? null;
  }
});
</script>

<style lang="scss" scoped>
.augment-item {
  width: 40%;
  height: 20vh;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;

  &.selected {
    border: 3px solid gold;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
}
</style>
