<template>
  <div class="flex flex-col flex justify-center items-center">
    <div class="flex justify-center mb-4">
      <label class="text-4xl bg-primary px-5 rounded">{{
        (selectedEiloidon[0] ?? 0) +
        (selectedEiloidon[1] ?? 0) +
        (selectedEiloidon[2] ?? 0) +
        (selectedEiloidon[3] ?? 0) +
        (selectedImpose[0] ?? 0) +
        (selectedImpose[1] ?? 0) +
        (selectedImpose[2] ?? 0) +
        (selectedImpose[3] ?? 0) +
        bonus +
        bonusLightcone
      }}</label>
      <Button label="Reset" @click="reset()" />
      <Button label="Lưu" @click="visible = true" />
      <Button label="Xem comp" @click="visible1 = true" />
    </div>
    <div class="flex w-5/6 gap-10 px-50">
      <div
        v-for="index in 4"
        :key="index - 1"
        @click="count = index - 1"
        class="flex-1 hover:cursor-pointer transition-all duration-300"
        :class="[
          count === index - 1
            ? 'ring-4 ring-blue-500 rounded-lg shadow-lg scale-105 neon-border'
            : 'hover:shadow hover:scale-102',
        ]"
      >
        <div class="w-full pb-100% relative">
          <NuxtImg
            v-if="char[index - 1].icon !== ''"
            :src="link + char[index - 1].icon"
            :alt="char[index - 1].name"
            class="absolute inset-0 w-full h-full object-cover bg-primary rounded-t-lg"
          />
        </div>
        <div class="text-center mt-2 font-medium">
          {{ char[index - 1].name ?? "" }}
        </div>

        <Select
          v-model="selectedEiloidon[index - 1]"
          :options="Object.entries(char[index - 1].eiloidon)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3 mt-2"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>

        <Select
          v-model="selectedLightcone[index - 1]"
          :options="Object.entries(filteredLightcone)"
          optionLabel="0"
          optionValue="1"
          filter
          class="w-1/3 mt-2"
          @change="selectLightcone(index - 1)"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>

        <Select
          v-if="selectedLightcone[index - 1]?.lightcone"
          v-model="selectedImpose[index - 1]"
          :options="Object.entries(selectedLightcone[index - 1].lightcone)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3 mt-2"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
      </div>
    </div>
  </div>
  <div class="overflow-y-auto h-[60vh] pt-5">
    <div class="grid grid-cols-16 gap-1">
      <div
        v-for="item in data"
        :key="item.name"
        class="flex flex-col items-center bg-primary rounded overflow-hidden"
      >
        <div class="w-full pb-[100%] relative">
          <NuxtImg
            v-if="item.icon !== ''"
            :src="link + item.icon"
            :alt="item.name"
            class="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%] object-cover transition-transform duration-200 ease-in-out"
            @click="select(item)"
            @mouseenter="$event.target.classList.add('scale-110')"
            @mouseleave="$event.target.classList.remove('scale-110')"
          />
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Lưu comp"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    @close="visible = false"
  >
    <AlzcUpload
      :comp="
        char[0].name +
        ' ' +
        char[1].name +
        ' ' +
        char[2].name +
        ' ' +
        char[3].name
      "
      :point="
        bonus +
        bonusLightcone +
        (selectedEiloidon[0] ?? 0) +
        (selectedEiloidon[1] ?? 0) +
        (selectedEiloidon[2] ?? 0) +
        (selectedEiloidon[3] ?? 0) +
        (selectedImpose[0] ?? 0) +
        (selectedImpose[1] ?? 0) +
        (selectedImpose[2] ?? 0) +
        (selectedImpose[3] ?? 0)
      "
    />
  </Dialog>
  <Dialog
    v-model:visible="visible1"
    modal
    header="Xem comp"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    @close="visible = false"
  >
    <AlzcList />
  </Dialog>
</template>

<script setup>
const visible = ref(false);
const visible1 = ref(false);
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const char = ref([
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
]);
const selectedEiloidon = ref([]);
const selectedLightcone = ref([
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
]);
const selectedImpose = ref([]);
const filterCharacters = ref();
const count = ref(0);
const bonus = computed(() => {
  const characterNames = char.value.map((c) => c.name);
  const hasCharacter = (name) => characterNames.includes(name);
  let point = 0;
  if (hasCharacter("Acheron")) {
    if (hasCharacter("Jiaoqiu")) {
      point += 2;
    }
    if (hasCharacter("Welt")) {
      point += 2;
    }
  }
  if (hasCharacter("Sparkle")) {
    if (hasCharacter("Qingque")) {
      point += 1;
    }
    if (hasCharacter("Dan Heng IL")) {
      point += 1;
    }
    if (hasCharacter("Seele")) {
      point += 0.5;
    }
  }
  if (hasCharacter("Ruan Mei")) {
    if (hasCharacter("Main Hòa Hợp")) {
      point += 2.5;
    }
    if (hasCharacter("Boothill")) {
      point += 2;
    }
    if (hasCharacter("Luka")) {
      point += 2;
    }
    if (hasCharacter("Xueyi")) {
      point += 1;
    }
  }
  if (hasCharacter("Robin")) {
    if (hasCharacter("Feixiao")) {
      point += 2;
    }
    if (hasCharacter("Yunli")) {
      point += 1.5;
    }
    if (hasCharacter("Dr. Ratio")) {
      point += 1;
    }
    if (hasCharacter("Jade")) {
      point += 1;
    }
    if (hasCharacter("Moze")) {
      point += 1;
    }
    if (hasCharacter("Topaz & Numby")) {
      point += 1;
    }
    if (hasCharacter("March7 Săn Bắn")) {
      point += 1;
    }
  }
  return point;
});
const bonusLightcone = computed(() => {
  const lightconeNames = selectedLightcone.value.map((lc) => lc.name);
  const muaMuaMuaCount = lightconeNames.filter(
    (name) => name === "Múa, Múa, Múa"
  ).length;
  return muaMuaMuaCount >= 2 ? 1.5 : 0;
});
const data = ref({
  acheron: {
    name: "Acheron",
    eiloidon: {
      e0: 4.5,
      e1: 6,
      e2: 16.5,
      e3: 17,
    },
    lightcone: {
      s1: 3,
      s2: 3.5,
      s3: 4,
    },
    icon: "icon/character/1308.png",
  },
  argenti: {
    name: "Argenti",
    eiloidon: {
      e0: 4,
      e1: 5.5,
      e2: 9,
      e3: 10,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1302.png",
  },
  arlan: {
    name: "Arlan",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1008.png",
  },
  asta: {
    name: "Asta",
    eiloidon: {
      2.5: 2.5,
    },
    icon: "icon/character/1009.png",
  },
  aventurine: {
    name: "Aventurine",
    eiloidon: {
      e0: 2.5,
      e1: 3,
      e2: 5.5,
      e3: 6,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1304.png",
  },
  bailu: {
    name: "Bailu",
    eiloidon: {
      e0: 1,
      e1: 1,
      e2: 1,
      e3: 1,
      e4: 1.5,
    },
    icon: "icon/character/1211.png",
  },
  blackswan: {
    name: "Black Swan",
    eiloidon: {
      e0: 3,
      e1: 7,
      e2: 7.5,
      e3: 8,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1307.png",
  },
  boothill: {
    name: "Boothill",
    eiloidon: {
      e0: 7,
      e1: 9.5,
      e2: 12.5,
      e3: 13.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1315.png",
  },
  blade: {
    name: "Blade",
    eiloidon: {
      e0: 3.5,
      e1: 5.5,
      e2: 9.5,
      e3: 10,
    },
    lightcone: {
      s1: 2,
      s2: 2.5,
      s3: 3,
    },
    icon: "icon/character/1205.png",
  },
  bronya: {
    name: "Bronya",
    eiloidon: {
      e0: 4,
      e1: 4.5,
      e2: 5,
      e3: 5,
      e4: 6.5,
    },
    icon: "icon/character/1101.png",
  },
  clara: {
    name: "Clara",
    eiloidon: {
      e0: 3,
      e1: 3,
      e2: 3.5,
      e3: 3.5,
      e4: 4,
    },
    icon: "icon/character/1107.png",
  },
  danhengil: {
    name: "Dan Heng IL",
    eiloidon: {
      e0: 4.5,
      e1: 5.5,
      e2: 13,
      e3: 13.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1213.png",
  },
  danheng: {
    name: "Dan Heng",
    eiloidon: {
      3.5: 3.5,
    },
    icon: "icon/character/1002.png",
  },
  drratio: {
    name: "Dr. Ratio",
    eiloidon: {
      e0: 5.5,
      e1: 7,
      e2: 11.5,
      e3: 12,
    },
    lightcone: {
      s1: 3,
      s2: 3.5,
      s3: 4,
    },
    icon: "icon/character/1305.png",
  },
  fuxuan: {
    name: "Fuxuan",
    eiloidon: {
      e0: 1.5,
      e1: 3,
      e2: 3.5,
      e3: 4,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1208.png",
  },
  firefly: {
    name: "FireFly",
    eiloidon: {
      e0: 5,
      e1: 7.5,
      e2: 14.5,
      e3: 15.5,
    },
    lightcone: {
      s1: 2,
      s2: 2.5,
      s3: 3,
    },
    icon: "icon/character/1310.png",
  },
  gepard: {
    name: "Gepard",
    eiloidon: {
      e0: 1,
      e1: 1,
      e2: 1,
      e3: 1,
      e4: 1.5,
      e5: 1.5,
      e6: 1.5,
    },
    icon: "icon/character/1104.png",
  },
  gallagher: {
    name: "Gallagher",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1301.png",
  },
  guinaifen: {
    name: "Guinaifen",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1210.png",
  },
  hanya: {
    name: "Hanya",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/1215.png",
  },
  herta: {
    name: "Herta",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1013.png",
  },
  himeko: {
    name: "Himeko",
    eiloidon: {
      e0: 3,
      e1: 3.5,
      e2: 3.5,
      e3: 3.5,
      e4: 5.5,
    },
    icon: "icon/character/1003.png",
  },
  hook: {
    name: "Hook",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1109.png",
  },
  huohuo: {
    name: "Huohuo",
    eiloidon: {
      e0: 2.5,
      e1: 4,
      e2: 4.5,
      e3: 5,
    },
    lightcone: {
      s1: 0.5,
      s2: 1,
      s3: 1.5,
    },
    icon: "icon/character/1217.png",
  },
  jingyuan: {
    name: "Jing Yuan",
    eiloidon: {
      e0: 1,
      e1: 2,
      e2: 2.5,
      e3: 3,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1204.png",
  },
  jingliu: {
    name: "Jingliu",
    eiloidon: {
      e0: 3.5,
      e1: 7,
      e2: 9,
      e3: 9.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1212.png",
  },
  jade: {
    name: "Jade",
    eiloidon: {
      e0: 2.5,
      e1: 5,
      e2: 7,
      e3: 7.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1314.png",
  },
  kafka: {
    name: "Kafka",
    eiloidon: {
      e0: 2.5,
      e1: 4.5,
      e2: 5,
      e3: 5.5,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1005.png",
  },
  luka: {
    name: "Luka",
    eiloidon: {
      4.5: 4.5,
    },
    icon: "icon/character/1111.png",
  },
  luocha: {
    name: "Luocha",
    eiloidon: {
      e0: 1.5,
      e1: 2,
      e2: 2.5,
      e3: 3,
    },
    lightcone: {
      0: 0,
    },
    icon: "icon/character/1203.png",
  },
  lynx: {
    name: "Lynx",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1110.png",
  },
  mainfire: {
    name: "Main Hỏa",
    eiloidon: {
      1.5: 1.5,
    },
    icon: "icon/character/8003.png",
  },
  mainphysic: {
    name: "Main Vật Lý",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/8001.png",
  },
  mainimaginary: {
    name: "Main Hòa Hợp",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/8006.png",
  },
  march7: {
    name: "March 7th",
    eiloidon: {
      1.5: 1.5,
    },
    icon: "icon/character/1001.png",
  },
  march7sa: {
    name: "March7 Săn Bắn",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1224.png",
  },
  misha: {
    name: "Misha",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/1312.png",
  },
  natasha: {
    name: "Natasha",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1105.png",
  },
  pela: {
    name: "Pela",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/1106.png",
  },
  qingque: {
    name: "Qingque",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1201.png",
  },
  ruanmei: {
    name: "Ruan Mei",
    eiloidon: {
      e0: 5,
      e1: 7.5,
      e2: 8,
      e3: 8.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1303.png",
  },
  robin: {
    name: "Robin",
    eiloidon: {
      e0: 5,
      e1: 9,
      e2: 10,
      e3: 10.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1309.png",
  },
  sampo: {
    name: "Sampo",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1108.png",
  },
  seele: {
    name: "Seele",
    eiloidon: {
      e0: 4,
      e1: 4.5,
      e2: 7,
      e3: 7.5,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1102.png",
  },
  serval: {
    name: "Serval",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1103.png",
  },
  silverwolf: {
    name: "Silver Wolf",
    eiloidon: {
      e0: 3,
      e1: 4.5,
      e2: 5.5,
      e3: 6,
    },
    lightcone: {
      s1: 2,
      s2: 2.5,
      s3: 3,
    },
    icon: "icon/character/1006.png",
  },
  sparkle: {
    name: "Sparkle",
    eiloidon: {
      e0: 4,
      e1: 5,
      e2: 9.5,
      e3: 10,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1306.png",
  },
  sushang: {
    name: "Sushang",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1206.png",
  },
  tingyun: {
    name: "Tingyun",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1202.png",
  },
  topaz: {
    name: "Topaz & Numby",
    eiloidon: {
      e0: 3.5,
      e1: 5.5,
      e2: 6.5,
      e3: 7,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1112.png",
  },
  welt: {
    name: "Welt",
    eiloidon: {
      e0: 1.5,
      e1: 1.5,
      e2: 2,
      e3: 2,
      e4: 2.5,
    },
    icon: "icon/character/1004.png",
  },
  xueyi: {
    name: "Xueyi",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1214.png",
  },
  yunli: {
    name: "Yunli",
    eiloidon: {
      e0: 6.5,
      e1: 11,
      e2: 13,
      e3: 13.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1221.png",
  },
  yanqing: {
    name: "Yanqing",
    eiloidon: {
      e0: 1.5,
      e1: 1.5,
      e2: 2,
      e3: 2,
      e4: 3.5,
    },
    icon: "icon/character/1209.png",
  },
  yukong: {
    name: "Yukong",
    eiloidon: {
      2.5: 2.5,
    },
    icon: "icon/character/1207.png",
  },
  feixiao: {
    name: "Feixiao",
    eiloidon: {
      e0: 7,
      e1: 11,
      e2: 19,
      e3: 19.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1220.png",
  },
  jiaoqiu: {
    name: "Jiaoqiu",
    eiloidon: {
      e0: 4,
      e1: 6.5,
      e2: 8,
      e3: 8.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1218.png",
  },
  moze: {
    name: "Moze",
    eiloidon: {
      2.5: 2.5,
    },
    icon: "icon/character/1223.png",
  },
  lingsha: {
    name: "Lingsha",
    eiloidon: {
      e0: 3,
      e1: 7,
      e2: 8,
      e3: 8.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1222.png",
  },
});
filterCharacters.value = Object.values(data.value);
const lightcone = ref({
  "★★★★": {
    name: "★★★★",
    lightcone: {
      s1: 0,
    },
  },
  "Múa Múa Múa": {
    name: "Múa, Múa, Múa",
    lightcone: {
      s1: 0,
    },
  },
  acheron: {
    name: "Acheron",
    eiloidon: {
      e0: 4.5,
      e1: 6.5,
      e2: 17,
      e3: 18,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1308.png",
  },
  argenti: {
    name: "Argenti",
    eiloidon: {
      e0: 4,
      e1: 6,
      e2: 9,
      e3: 10,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1302.png",
  },
  arlan: {
    name: "Arlan",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1008.png",
  },
  asta: {
    name: "Asta",
    eiloidon: {
      2.5: 2.5,
    },
    icon: "icon/character/1009.png",
  },
  aventurine: {
    name: "Aventurine",
    eiloidon: {
      e0: 2.5,
      e1: 3,
      e2: 6,
      e3: 7,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1304.png",
  },
  bailu: {
    name: "Bailu",
    eiloidon: {
      e0: 1,
      e1: 1,
      e2: 1,
      e3: 1,
      e4: 1.5,
    },
    lightcone: {
      s1: 0,
      s2: 0,
      s3: 0.5,
      s4: 1,
      s5: 1.5,
    },
    icon: "icon/character/1211.png",
  },
  blackswan: {
    name: "Black Swan",
    eiloidon: {
      e0: 3,
      e1: 7.5,
      e2: 9,
      e3: 10,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1307.png",
  },
  boothill: {
    name: "Boothill",
    eiloidon: {
      e0: 7,
      e1: 10,
      e2: 13,
      e3: 14,
    },
    lightcone: {
      s1: 2,
      s2: 2.5,
      s3: 3,
    },
    icon: "icon/character/1315.png",
  },
  blade: {
    name: "Blade",
    eiloidon: {
      e0: 3.5,
      e1: 6,
      e2: 10,
      e3: 11,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1205.png",
  },
  bronya: {
    name: "Bronya",
    eiloidon: {
      e0: 4,
      e1: 4.5,
      e2: 5,
      e3: 5,
      e4: 7,
    },
    lightcone: {
      s1: 0,
      s2: 0,
      s3: 0.5,
      s4: 1,
      s5: 1.5,
    },
    icon: "icon/character/1101.png",
  },
  clara: {
    name: "Clara",
    eiloidon: {
      e0: 3,
      e1: 3,
      e2: 3.5,
      e3: 3.5,
      e4: 4,
    },
    lightcone: {
      s1: 0,
      s2: 0,
      s3: 0.5,
      s4: 1,
      s5: 1.5,
    },
    icon: "icon/character/1107.png",
  },
  danhengil: {
    name: "Dan Heng IL",
    eiloidon: {
      e0: 4.5,
      e1: 6,
      e2: 13.5,
      e3: 14.5,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1213.png",
  },
  danheng: {
    name: "Dan Heng",
    eiloidon: {
      3.5: 3.5,
    },
    icon: "icon/character/1002.png",
  },
  drratio: {
    name: "Dr. Ratio",
    eiloidon: {
      e0: 5.5,
      e1: 7.5,
      e2: 12,
      e3: 13,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1305.png",
  },
  fuxuan: {
    name: "Fuxuan",
    eiloidon: {
      e0: 1.5,
      e1: 3.5,
      e2: 4,
      e3: 5,
    },
    lightcone: {
      s1: 0.5,
      s2: 1,
      s3: 1.5,
    },
    icon: "icon/character/1208.png",
  },
  firefly: {
    name: "FireFly",
    eiloidon: {
      e0: 5,
      e1: 7.5,
      e2: 14.5,
      e3: 15.5,
    },
    lightcone: {
      s1: 2,
      s2: 2.5,
      s3: 3,
    },
    icon: "icon/character/1310.png",
  },
  gepard: {
    name: "Gepard",
    eiloidon: {
      e0: 1,
      e1: 1,
      e2: 1,
      e3: 1,
      e4: 1.5,
      e5: 1.5,
      e6: 1.5,
    },
    lightcone: {
      s1: 0,
      s2: 0,
      s3: 0.5,
      s4: 1,
      s5: 1.5,
    },
    icon: "icon/character/1104.png",
  },
  gallagher: {
    name: "Gallagher",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1301.png",
  },
  guinaifen: {
    name: "Guinaifen",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1210.png",
  },
  hanya: {
    name: "Hanya",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/1215.png",
  },
  herta: {
    name: "Herta",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1013.png",
  },
  himeko: {
    name: "Himeko",
    eiloidon: {
      e0: 3,
      e1: 3.5,
      e2: 3.5,
      e3: 3.5,
      e4: 5.5,
    },
    lightcone: {
      s1: 0,
      s2: 0,
      s3: 0.5,
      s4: 1,
      s5: 1.5,
    },
    icon: "icon/character/1003.png",
  },
  hook: {
    name: "Hook",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1109.png",
  },
  huohuo: {
    name: "Huohuo",
    eiloidon: {
      e0: 2.5,
      e1: 4,
      e2: 4.5,
      e3: 5,
    },
    lightcone: {
      s1: 0.5,
      s2: 1,
      s3: 1.5,
    },
    icon: "icon/character/1217.png",
  },
  jingyuan: {
    name: "Jing Yuan",
    eiloidon: {
      e0: 1,
      e1: 2,
      e2: 2.5,
      e3: 3,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1204.png",
  },
  jingliu: {
    name: "Jingliu",
    eiloidon: {
      e0: 3.5,
      e1: 7,
      e2: 9,
      e3: 9.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1212.png",
  },
  jade: {
    name: "Jade",
    eiloidon: {
      e0: 2.5,
      e1: 5,
      e2: 7,
      e3: 7.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1314.png",
  },
  kafka: {
    name: "Kafka",
    eiloidon: {
      e0: 2.5,
      e1: 4.5,
      e2: 5,
      e3: 5.5,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1005.png",
  },
  luka: {
    name: "Luka",
    eiloidon: {
      4.5: 4.5,
    },
    icon: "icon/character/1111.png",
  },
  luocha: {
    name: "Luocha",
    eiloidon: {
      e0: 1.5,
      e1: 2,
      e2: 2.5,
      e3: 3,
    },
    lightcone: {
      s1: 0,
    },
    icon: "icon/character/1203.png",
  },
  lynx: {
    name: "Lynx",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1110.png",
  },
  mainfire: {
    name: "Main Hỏa",
    eiloidon: {
      1.5: 1.5,
    },
    icon: "icon/character/8003.png",
  },
  mainphysic: {
    name: "Main Vật Lý",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/8001.png",
  },
  mainimaginary: {
    name: "Main Hòa Hợp",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/8006.png",
  },
  march7: {
    name: "March 7th",
    eiloidon: {
      1.5: 1.5,
    },
    icon: "icon/character/1001.png",
  },
  march7sa: {
    name: "March7 Săn Bắn",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1224.png",
  },
  misha: {
    name: "Misha",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/1312.png",
  },
  natasha: {
    name: "Natasha",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1105.png",
  },
  pela: {
    name: "Pela",
    eiloidon: {
      3: 3,
    },
    icon: "icon/character/1106.png",
  },
  qingque: {
    name: "Qingque",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1201.png",
  },
  ruanmei: {
    name: "Ruan Mei",
    eiloidon: {
      e0: 5,
      e1: 7.5,
      e2: 8,
      e3: 8.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1303.png",
  },
  robin: {
    name: "Robin",
    eiloidon: {
      e0: 5,
      e1: 9,
      e2: 10,
      e3: 10.5,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1309.png",
  },
  sampo: {
    name: "Sampo",
    eiloidon: {
      2: 2,
    },
    icon: "icon/character/1108.png",
  },
  seele: {
    name: "Seele",
    eiloidon: {
      e0: 4,
      e1: 4.5,
      e2: 7,
      e3: 7.5,
    },
    lightcone: {
      s1: 1,
      s2: 1.5,
      s3: 2,
    },
    icon: "icon/character/1102.png",
  },
  serval: {
    name: "Serval",
    eiloidon: {
      1: 1,
    },
    icon: "icon/character/1103.png",
  },
  silverwolf: {
    name: "Silver Wolf",
    eiloidon: {
      e0: 3,
      e1: 4.5,
      e2: 5.5,
      e3: 6,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1006.png",
  },
  sparkle: {
    name: "Sparkle",
    eiloidon: {
      e0: 4,
      e1: 5,
      e2: 9.5,
      e3: 10,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1306.png",
  },
  sushang: {
    name: "Sushang",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1206.png",
  },
  tingyun: {
    name: "Tingyun",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1202.png",
  },
  topaz: {
    name: "Topaz & Numby",
    eiloidon: {
      e0: 3.5,
      e1: 5.5,
      e2: 6.5,
      e3: 7,
    },
    lightcone: {
      s1: 1.5,
      s2: 2,
      s3: 2.5,
    },
    icon: "icon/character/1112.png",
  },
  welt: {
    name: "Welt",
    eiloidon: {
      e0: 1.5,
      e1: 1.5,
      e2: 2,
      e3: 2,
      e4: 2.5,
    },
    lightcone: {
      s1: 0,
      s2: 0,
      s3: 0.5,
      s4: 1,
      s5: 1.5,
    },
    icon: "icon/character/1004.png",
  },
  xueyi: {
    name: "Xueyi",
    eiloidon: {
      4: 4,
    },
    icon: "icon/character/1214.png",
  },
  yunli: {
    name: "Yunli",
    eiloidon: {
      e0: 6.5,
      e1: 11,
      e2: 13,
      e3: 13.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1221.png",
  },
  yanqing: {
    name: "Yanqing",
    eiloidon: {
      e0: 1.5,
      e1: 1.5,
      e2: 2,
      e3: 2,
      e4: 3.5,
    },
    lightcone: {
      s1: 0,
      s2: 0,
      s3: 0.5,
      s4: 1,
      s5: 1.5,
    },
    icon: "icon/character/1209.png",
  },
  yukong: {
    name: "Yukong",
    eiloidon: {
      2.5: 2.5,
    },
    icon: "icon/character/1207.png",
  },
  feixiao: {
    name: "Feixiao",
    eiloidon: {
      e0: 7,
      e1: 11,
      e2: 19,
      e3: 19.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1220.png",
  },
  jiaoqiu: {
    name: "Jiaoqiu",
    eiloidon: {
      e0: 4,
      e1: 6.5,
      e2: 8,
      e3: 8.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1218.png",
  },
  moze: {
    name: "Moze",
    eiloidon: {
      2.5: 2.5,
    },
    icon: "icon/character/1223.png",
  },
  lingsha: {
    name: "Lingsha",
    eiloidon: {
      e0: 3,
      e1: 7,
      e2: 8,
      e3: 8.5,
    },
    lightcone: {
      s1: 2.5,
      s2: 3,
      s3: 3.5,
    },
    icon: "icon/character/1222.png",
  },
});
const filteredLightcone = Object.fromEntries(
  Object.entries(lightcone.value).filter(([_, value]) => "lightcone" in value)
);
const reset = () => {
  char.value = [
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
  ];
  selectedEiloidon.value = [0, 0, 0, 0];
  selectedImpose.value = [0, 0, 0, 0];
  selectedLightcone.value = [
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
  ];
  count.value = 0;
};
const select = (item) => {
  char.value[count.value] = item;
  // Check if eiloidon exists and has e0 property
  if (item.eiloidon && "e0" in item.eiloidon) {
    selectedEiloidon.value[count.value] = item.eiloidon.e0;
  } else {
    // If e0 doesn't exist, find the first available property
    const firstKey = Object.keys(item.eiloidon)[0];
    selectedEiloidon.value[count.value] = item.eiloidon[firstKey] || 1;
  }
  if (
    char.value[0].name == "" ||
    char.value[1].name == "" ||
    char.value[2].name == "" ||
    char.value[3].name == ""
  ) {
    count.value++;
  } else {
    count.value = 4;
  }
};
const selectLightcone = (index) => {
  selectedImpose.value[index] = selectedLightcone.value[index].lightcone.s1;
};
</script>

<style>
.neon-border {
  border: 1px solid rgba(0, 255, 255, 0.5);
  box-shadow: rgb(255, 255, 255) 0px 0px 0.2rem,
    rgb(255, 255, 255) 0px 0px 0.1rem, rgba(0, 255, 255, 0.5) 0px 0px 1rem,
    rgba(0, 255, 255, 0.5) 0px 0px 0.4rem, rgba(0, 255, 255, 0.5) 0px 0px 1rem,
    rgba(0, 255, 255, 0.5) 0px 0px 0.7rem inset;
}
</style>
