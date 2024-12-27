<template>
  <div class="augment-container flex gap-32 absolute top-1/4 left-1/5.3">
    <template v-for="(item, index) in augmentData">
      <div
        class="augment-item"
        :class="{ selected: selectedIndex === index }"
        @click="selectItem(index)"
      >
        <div class="augment-img h-60%">
          <NuxtImg :src="item.image" class="w-full h-full object-contain" />
          <div
            class="augment-name flex items-center justify-center text-center"
          >
            <h3>{{ item.name }}</h3>
          </div>
        </div>
        <div
          class="augment-text h-40% flex items-center justify-center text-center"
        >
          <div class="augment-info m-2">
            {{ item.description }}
          </div>
        </div>
      </div>
    </template>
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

const selectedIndex = ref(null);

const selectItem = (index) => {
  selectedIndex.value = index;
  store.updateGameData(
    `${id}`,
    `augment/team${props.team}`,
    augmentData.value[index]
  );
};

const augmentData = ref([
  {
    name: 'Cái giá phải trả',
    description:
      'Khởi đầu với 8 lần reset miễn phí, hoàn thành node thi đấu đầu tiên, mất hết số lần reset miễn phí còn lại.',
    image: 'https://cdn.metatft.com/file/metatft/augments/atwhatcost_iii.png',
  },
  {
    name: 'Liều ăn nhiều',
    description:
      'Không còn lần reset miễn phí, được -1 cycle và có thêm 5 phút để chuẩn bị cho mỗi node.',
    image:
      'https://cdn.metatft.com/file/metatft/augments/sacrificial-pact-iii.png',
  },
  {
    name: 'Ngày an lành',
    description: 'Có 4 lần reset miễn phí.',
    image:
      'https://cdn.metatft.com/file/metatft/augments/trade3.png',
  },
]);
</script>

<style lang="scss" scoped>
.augment-item {
  width: 20%;
  height: 50vh;
  border: 1px solid red;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;

  &.selected {
    border: 3px solid gold;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
}
</style>
