<template>
  <div class="layout-wrapper">
    <video autoplay muted loop playsinline class="background-video">
      <source src="/image/background/bg.b7b6a1c.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <SharedTopBar />
    <div class="layout-main-container min-h-85vh">
      <div class="layout-main">
        <NuxtPage />
      </div>
    </div>
    <SharedFootBar />
    <div class="layout-mask animate-fadein" />
    <Toast />
  </div>
</template>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.layout-main-container,
.layout-mask,
Toast {
  position: relative;
  z-index: 1; /* Ensures the content is displayed over the video */
}
</style>
