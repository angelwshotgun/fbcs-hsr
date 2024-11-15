<template>
  <div>
    <Button
      label="xd"
      @click="store.deleteGame(`${id}`)"
    />
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const store = useStore();
const route = useRoute();
const id = route.params.id;

// Biến cờ để kiểm tra nếu đang rời khỏi trang
let isLeavingPage = false;

// Chỉ gọi khi vào trang hoặc khi không phải rời khỏi
if (process.client) {
  onMounted(() => {
    if (!isLeavingPage) {
      store.initializeGame(`${id}`);
      store.createGame(`${id}`);
    }
  });

  // Đảm bảo `beforeunload` chỉ gọi `deleteGame` khi rời khỏi trang
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    store.deleteGame(`${id}`);
    isLeavingPage = true; // Đặt cờ để không gọi lại `createGame`
    event.returnValue = ''; // Một chuỗi trống cần thiết để kích hoạt thông báo
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
}

// Hàm dọn dẹp
onUnmounted(() => {
  store.cleanup();
  console.log('cleanup');
});

// Gọi cập nhật dữ liệu khi trang được tải
await store.updateGame(`${id}`, 'ban/bc1', {
  img: "new-img",
  name: "new-name",
  path: "new-path",
  point: [1, 1, 1, 1, 1, 1, 1]
});
</script>
