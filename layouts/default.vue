<template>
  <div
    class="layout-wrapper"
    :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
  >
    <SharedTopBar />
    <div class="layout-main-container">
      <div class="layout-main">
        <NuxtPage />
      </div>
    </div>
    <div class="layout-mask animate-fadein" />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const backgroundImageUrl = ref('')

onMounted(() => {
  // Sử dụng đường dẫn tương đối đến thư mục public
  backgroundImageUrl.value = '/image/background/entryPage.png'
})
</script>

<style scoped>
.layout-wrapper {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>