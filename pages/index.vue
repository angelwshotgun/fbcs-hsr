<template>
  <div>
    <div v-if="!isCreated">
      <div class="flex items-center">
        <h1>Tên trận đấu:</h1>
        <InputText v-model="name" class="h-1/2" />
      </div>
      <Button label="Tạo trận đấu" @click="createGame()" />
    </div>
    <div v-if="isCreated">
      <h2>Chỉ tắt trang này khi xong trận</h2>
      <div class="flex items-center">
        <h2 class="w-[150px]">Link Team 1:</h2>
        <InputText
          v-model="team1"
          class="h-1/2 cursor-pointer"
          @click="copyToClipboard(team1)"
          :disabled="true"
        />
        <Button
          icon="pi pi-copy"
          @click="copyToClipboard(team1)"
          class="ml-2"
        />
      </div>
      <div class="flex items-center">
        <h2 class="w-[150px]">Link Team 2:</h2>
        <InputText
          v-model="team2"
          class="h-1/2 cursor-pointer"
          @click="copyToClipboard(team2)"
          :disabled="true"
        />
        <Button
          icon="pi pi-copy"
          @click="copyToClipboard(team2)"
          class="ml-2"
        />
      </div>
      <div class="flex items-center">
        <h2 class="w-[150px]">Link Theo dõi:</h2>
        <InputText
          v-model="view"
          class="h-1/2 cursor-pointer"
          @click="copyToClipboard(team2)"
          :disabled="true"
        />
        <Button
          icon="pi pi-copy"
          @click="copyToClipboard(team2)"
          class="ml-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/useStore";

const store = useStore();
const name = ref();
const team1 = ref();
const team2 = ref();
const view = ref();
const isCreated = ref(false);
const { $generateHashID } = useNuxtApp();

const createGame = () => {
  const id = $generateHashID(name.value);
  team1.value = `fbcs-hsr.vercel.app/${id}/team1`;
  team2.value = `fbcs-hsr.vercel.app/${id}/team2`;
  view.value = `fbcs-hsr.vercel.app/${id}`;
  store.createGame(`${id}`);
  isCreated.value = true;
};
const copyToClipboard = async (text) => {
  if (process.client && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
};

if (process.client) {
  let isLeavingPage = false;

  const handleBeforeUnload = (event) => {
    // Thiết lập thông báo yêu cầu xác nhận từ người dùng
    event.preventDefault();
    event.returnValue = ""; // Chỉ định nội dung thông báo (một số trình duyệt bỏ qua phần nội dung)
    isLeavingPage = true;
  };

  const handleUnload = () => {
    // Thực hiện hành động xóa chỉ khi isLeavingPage là true
    if (isLeavingPage) {
      const id = $generateHashID(name.value);
      store.deleteGame(`${id}`);
    }
  };

  // Thêm sự kiện trước khi rời trang
  window.addEventListener("beforeunload", handleBeforeUnload);
  // Thêm sự kiện khi rời khỏi trang
  window.addEventListener("unload", handleUnload);

  onBeforeUnmount(() => {
    // Xóa các sự kiện khi component unmount
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.removeEventListener("unload", handleUnload);
  });
}

onUnmounted(() => {
  store.cleanup();
  console.log("cleanup");
});
</script>
