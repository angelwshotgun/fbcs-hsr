<template>
  <div class="container">
    <video ref="videoPlayer" autoplay loop muted class="absolute top-0 left-0 w-full h-full object-cover -z-10">
      <source src="~/public/video/acheron.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img
      ref="image"
      class="image"
      :src="link + 'image/character_portrait/1001.png'"
      v-show="!isShrunk"
      @click="shrinkImage"
    />
    <img
      ref="image1"
      class="image1"
      :src="link + 'icon/character/1001.png'"
      v-show="isShrunk"
      @click="shrinkImage"
    />
    <div ref="box" class="box"></div>
  </div>
</template>

<script setup>
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";
const image = ref(null);
const image1 = ref(null);
const box = ref(null);
const isShrunk = ref(false); // Theo dõi trạng thái thu nhỏ của ảnh
const { $anime } = useNuxtApp();

const shrinkImage = () => {
  if (!isShrunk.value) {
    // Lấy thông tin vị trí của hình ảnh và box
    const imageRect = image.value.getBoundingClientRect();
    const boxRect = box.value.getBoundingClientRect();

    // Tính tỷ lệ scale dựa trên kích thước mới
    const scale = boxRect.width / imageRect.width;

    // Tính kích thước mới của hình ảnh sau khi scale
    const newImageWidth = imageRect.width * scale;
    const newImageHeight = imageRect.height * scale;

    // Điều chỉnh vị trí dựa trên hệ quy chiếu của container
    const translateX =
      boxRect.left - imageRect.left - (imageRect.width - newImageWidth) / 2;
    const translateY =
      boxRect.top - imageRect.top - (imageRect.height - newImageHeight) / 2;

    // Thực hiện animation bằng Anime.js
    $anime({
      targets: image.value,
      translateX: translateX,
      translateY: translateY,
      scale: scale,
      easing: "easeInOutQuad",
      duration: 1000,
      complete: () => {
        isShrunk.value = true; // Ẩn ảnh image, hiện ảnh image1
      },
    });
  }
};
</script>
<style>
.container {
  position: relative;
  width: 100%;
  height: 500px;
}

.image {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 50%;
  height: auto;
  cursor: pointer;
  transform-origin: center center; /* Để phép scale không thay đổi vị trí gốc */
}
.image1 {
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 100px;
  height: auto;
  transform-origin: center center;
}
.box {
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 100px;
  height: 100px;
  border: 2px solid #333;
  z-index: -1;
}

</style>
