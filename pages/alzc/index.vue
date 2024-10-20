<template>
  <div>
    <div class="flex justify-center mb-4">
      <label class="text-4xl bg-primary px-5 rounded">{{
        (selectedEiloidon[0] ?? 0) +
        (selectedEiloidon[1] ?? 0) +
        (selectedEiloidon[2] ?? 0) +
        (selectedEiloidon[3] ?? 0) +
        (selectedImpose[0] ?? 0) +
        (selectedImpose[1] ?? 0) +
        (selectedImpose[2] ?? 0) +
        (selectedImpose[3] ?? 0)
      }}</label>
      <Button label="Reset" @click="reset()" />
    </div>
    <div class="flex gap-10 px-50">
      <div @click="count = 0" class="flex-1">
        <div class="w-full pb-[100%] relative">
          <NuxtImg
            v-if="char[0].icon !== ''"
            :src="link + char[0].icon"
            :alt="char[0].name"
            class="absolute inset-0 w-full h-full object-cover bg-primary"
          />
        </div>
        <div class="text-center mt-2">{{ char[0].name ?? "" }}</div>
        <Select
          v-model="selectedEiloidon[0]"
          :options="Object.entries(char[0].eiloidon)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-model="selectedLightcone[0]"
          :options="Object.entries(lightcone)"
          optionLabel="0"
          optionValue="1"
          filter
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-if="selectedLightcone[0]?.lightcone"
          v-model="selectedImpose[0]"
          :options="Object.entries(selectedLightcone[0].lightcone)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
      </div>
      <div @click="count = 1" class="flex-1">
        <div class="w-full pb-[100%] relative">
          <NuxtImg
            v-if="char[1].icon !== ''"
            :src="link + char[1].icon"
            :alt="char[1].name"
            class="absolute inset-0 w-full h-full object-cover bg-primary"
          />
        </div>
        <div class="text-center mt-2">{{ char[1].name ?? "" }}</div>
        <Select
          v-model="selectedEiloidon[1]"
          :options="Object.entries(char[1].eiloidon)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-model="selectedLightcone[1]"
          :options="Object.entries(lightcone)"
          optionLabel="0"
          optionValue="1"
          filter
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-if="selectedLightcone[1]?.lightcone"
          v-model="selectedImpose[1]"
          :options="Object.entries(selectedLightcone[1].lightcone)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
      </div>
      <div @click="count = 2" class="flex-1">
        <div class="w-full pb-[100%] relative">
          <NuxtImg
            v-if="char[2].icon !== ''"
            :src="link + char[2].icon"
            :alt="char[2].name"
            class="absolute inset-0 w-full h-full object-cover bg-primary"
          />
        </div>
        <div class="text-center mt-2">{{ char[2].name ?? "" }}</div>
        <Select
          v-model="selectedEiloidon[2]"
          :options="Object.entries(char[2].eiloidon)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-model="selectedLightcone[2]"
          :options="Object.entries(lightcone)"
          optionLabel="0"
          optionValue="1"
          filter
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-if="selectedLightcone[2]?.lightcone"
          v-model="selectedImpose[2]"
          :options="Object.entries(selectedLightcone[2].lightcone)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
      </div>
      <div @click="count = 3" class="flex-1">
        <div class="w-full pb-[100%] relative">
          <NuxtImg
            v-if="char[3].icon !== ''"
            :src="link + char[3].icon"
            :alt="char[3].name"
            class="absolute inset-0 w-full h-full object-cover bg-primary"
          />
        </div>
        <div class="text-center mt-2">{{ char[3].name ?? "" }}</div>
        <Select
          v-model="selectedEiloidon[3]"
          :options="Object.entries(char[3].eiloidon)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-model="selectedLightcone[3]"
          :options="Object.entries(lightcone)"
          optionLabel="0"
          optionValue="1"
          filter
          class="w-1/3"
        >
          <template #option="slotProps">
            <div>
              {{ slotProps.option[0] }}
            </div>
          </template>
        </Select>
        <Select
          v-if="selectedLightcone[3]?.lightcone"
          v-model="selectedImpose[3]"
          :options="Object.entries(selectedLightcone[3].lightcone)"
          optionLabel="0"
          optionValue="1"
          class="w-1/3"
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
  <div class="overflow-y-auto h-[60vh]">
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
</template>

<script setup>
const link = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const char = ref([
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
  { name: "", eiloidon: [], lightcone: [], icon: "" },
]);
const selectedEiloidon = ref([]);
const selectedLightcone = ref([]);
const selectedImpose = ref([]);
const filterCharacters = ref();
const count = ref(0);
const data = ref({
  acheron: {
    name: "Acheron",
    eiloidon: {
      e0: 4.5,
      e1: 6.5,
      e2: 17,
      e3: 18,
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
      e1: 6,
      e2: 10,
      e3: 11,
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
      e4: 7,
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
      e1: 6,
      e2: 13.5,
      e3: 14.5,
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
      e1: 7.5,
      e2: 12,
      e3: 13,
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
      e1: 3.5,
      e2: 4,
      e3: 5,
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
    lightcone: {
      0: 0,
    }
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
      e1: 6,
      e2: 10,
      e3: 11,
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
      e4: 7,
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
      e1: 6,
      e2: 13.5,
      e3: 14.5,
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
      e1: 7.5,
      e2: 12,
      e3: 13,
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
      e1: 3.5,
      e2: 4,
      e3: 5,
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
})
const reset = () => {
  char.value = [
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
    { name: "", eiloidon: [], lightcone: [], icon: "" },
  ];
  count.value = 0;
};
const select = (item) => {
  char.value[count.value] = item;
  count.value++;
};
</script>
