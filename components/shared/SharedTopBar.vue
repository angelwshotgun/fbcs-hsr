<template>
  <div class="flex justify-between items-center px-4" style="height: 50px">
    <h1 class="flex items-center">Font-Bard Championship Series</h1>
    <div class="flex items-center mr-12">
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
  colorMode.preference = 'system';
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