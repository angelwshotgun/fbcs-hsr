<template>
  <div class="layout-wrapper">
    <!-- Video background -->
    <div class="background-overlay">
      <video autoplay muted loop playsinline class="background-video">
        <source src="/image/background/bg.b7b6a1c.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="dark-overlay"></div> <!-- Lớp phủ màu tối -->
    </div>

    <!-- Nội dung trang -->
    <SharedTopBar />
    <div class="layout-main-container" style="min-height: calc(100vh - 50px);">
      <div class="layout-main px-2" style="min-height: calc(100vh - 50px);">
        <NuxtPage />
      </div>
    </div>
    <!-- <SharedFootBar /> -->
    <div class="layout-mask animate-fadein" />
    <Toast />
  </div>
</template>

<style scoped>
/* Vùng chứa tổng thể */
.layout-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Video nền */
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Nằm dưới các nội dung khác */
}

/* Lớp phủ màu tối */
.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1); /* Độ tối 50% */
  z-index: -1;
}

/* Container chính và các thành phần khác */
.layout-main-container,
.layout-mask,
Toast {
  position: relative;
  z-index: 1; /* Đảm bảo nội dung hiển thị phía trên video */
}
</style>
