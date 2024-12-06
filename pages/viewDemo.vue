<template>
  <div class="excel-container">
    <h1>Danh sách nhân vật</h1>

    <!-- Hiển thị dữ liệu dưới dạng bảng -->
    <div v-for="(character, id) in characters" :key="id">
      <div class="flex flex-row">
        <input v-model="character.name"/>
        <div>
          <input
            v-for="(character, index) in character.point"
            :key="index"
            type="number"
            v-model.number="characters[id].point[index]"
            step="0.25"
            min="-30"
            max="30"
          />
        </div>
      </div>
    </div>

    <div class="buttons">
      <!-- Nút để tải lại dữ liệu -->
      <button @click="fetchCharacters">Làm mới dữ liệu</button>

      <!-- Nút để xuất dữ liệu ra Excel -->
      <button @click="exportToExcel" :disabled="!characters.length">
        Xuất ra Excel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import * as XLSX from 'xlsx';

// Dữ liệu và logic
const characters = ref([]);

// Tính toán danh sách cột (headers)
const tableHeaders = computed(() =>
  characters.value.length ? Object.keys(characters.value[0]) : []
);

// Lấy dữ liệu từ API
const fetchCharacters = async () => {
  try {
    const response = await fetch('/api/characters');
    characters.value = await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};

// Xuất dữ liệu ra Excel
const exportToExcel = () => {
  if (!characters.value.length) return;

  const worksheet = XLSX.utils.json_to_sheet(characters.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách');
  XLSX.writeFile(workbook, 'characters.xlsx');
};

// Lấy dữ liệu khi trang được tải
onMounted(fetchCharacters);
</script>

<style scoped>
/* Tổng quan container */
.excel-container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

/* Bảng dữ liệu giống Excel */
.excel-table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

.excel-table th,
.excel-table td {
  border: 1px solid #d0d0d0;
  padding: 8px;
  text-align: left;
}

.excel-table th {
  background-color: #f4f4f4;
  font-weight: bold;
  border-bottom: 2px solid #bdbdbd;
}

.excel-table td {
  background-color: #ffffff;
}

.excel-table tr:nth-child(even) td {
  background-color: #f9f9f9;
}

/* Hiệu ứng khi di chuột */
.excel-table tr:hover td {
  background-color: #f1f1f1;
}

/* Nút chức năng */
.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
