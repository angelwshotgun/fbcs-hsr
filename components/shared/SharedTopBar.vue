<template>
  <div class="flex justify-between items-center px-4 relative" style="height: 50px">
    <h1 class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">Font-Bard Championship Series</h1>
    <div class="flex items-center mr-12 ml-auto">
      <Button
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        @click="toggleDarkMode"
        :class="['h-10 w-10']"
        rounded
        :style="getButtonStyle()"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const colorMode = useColorMode();

onMounted(() => {
  colorMode.preference = 'dark';
})

const isDark = computed(() => colorMode.value === 'dark');

const toggleDarkMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}

const getButtonStyle = () => {
  return {
    backgroundColor: isDark.value ? 'white' : 'black',
    color: isDark.value ? 'black' : 'white',
    border: '2px solid',
    borderColor: isDark.value ? 'white' : 'black',
    transition: 'all 0.3s ease',
  };
};
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
  transition: background-color 0.3s ease, color 0.3s ease;
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}

.p-button {
  transition: all 0.3s ease;
}

.p-button:hover {
  transform: scale(1.05);
}

/* Thêm animation cho icon */
.p-button .p-button-icon {
  transition: transform 0.3s ease;
}

.p-button:hover .p-button-icon {
  transform: rotate(360deg);
}
</style>