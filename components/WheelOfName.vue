<!-- WheelOfNames.vue -->
<template>
  <div class="wheel-container">
    <div class="wheel-wrapper">
      <canvas ref="wheelCanvas" width="500" height="500"></canvas>
      <div class="spin-button" @click="spinWheel">SPIN</div>
      <div class="arrow"></div>
    </div>
    <div class="confetti" v-if="showConfetti"></div>
    <div class="sidebar">
      <div class="entries">
        <div class="entries-header">
          <h3>Entries {{ namesArray.length }}</h3>
          <div class="entry-controls">
            <button @click="shuffleNames">Shuffle</button>
            <button @click="sortNames">Sort</button>
          </div>
        </div>
        <textarea
          v-model="namesText"
          @input="updateNamesArray"
          placeholder="Enter names, one per line"
          rows="10"
        ></textarea>
      </div>
      <div class="spin-settings">
        <label for="spinTime">Spin Time (seconds):</label>
        <input
          id="spinTime"
          v-model="spinTime"
          type="number"
          min="1"
          max="30"
        />
      </div>
    </div>
    <Dialog v-model:visible="showWinnerDialog" header="Winner Announcement" :style="{ width: '50vw' }">
        <p>The winner is: <strong>{{ winner }}</strong></p>
      </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import anime from "animejs";
import Dialog from "primevue/dialog";

const wheelCanvas = ref(null);
const showConfetti = ref(false);
const namesText = ref(
  "Ali\nBeatriz\nCharles\nDiya\nEric\nFatima\nGabriel\nHanna"
);
const namesArray = ref([]);
const showWinnerDialog = ref(false);
const winner = ref("");
const spinTime = ref(5);
let wheel = null;
let idleAnimation = null;

onMounted(() => {
  updateNamesArray();
  startIdleRotation();
});

// Cập nhật khi danh sách thay đổi
watch(namesArray, () => {
  initWheel();
  if (!idleAnimation) {
    startIdleRotation(); // Chỉ khởi động lại nếu không đang quay nhanh
  }
}, { deep: true });

function updateNamesArray() {
  namesArray.value = namesText.value
    .split("\n")
    .filter((name) => name.trim() !== "");
  initWheel();
}

function shuffleNames() {
  namesArray.value = namesArray.value.sort(() => Math.random() - 0.5);
  namesText.value = namesArray.value.join("\n");
}

function sortNames() {
  namesArray.value = namesArray.value.sort();
  namesText.value = namesArray.value.join("\n");
}

function initWheel() {
  const colors = ["#3369e8", "#d50f25", "#eeb211", "#009925"];

  wheel = {
    sectors: namesArray.value.map((name, index) => ({
      color: colors[index % colors.length],
      label: name,
      startAngle: (index / namesArray.value.length) * 2 * Math.PI,
      endAngle: ((index + 1) / namesArray.value.length) * 2 * Math.PI,
    })),
    totalAngle: 0,
  };

  drawWheel();
}

function drawWheel() {
  const canvas = wheelCanvas.value;
  if (!canvas || !wheel) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  wheel.sectors.forEach((sector) => {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2 - 10,
      sector.startAngle + wheel.totalAngle,
      sector.endAngle + wheel.totalAngle
    );
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = sector.color;
    ctx.fill();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((sector.startAngle + sector.endAngle) / 2 + wheel.totalAngle);
    ctx.textAlign = "right";
    ctx.fillStyle = (sector.color === "#eeb211" || sector.color === "#009925") ? "black" : "#fff";
    ctx.font = "bold 18px Arial";
    ctx.fillText(sector.label, canvas.width / 2 - 40, 0);
    ctx.restore();
  });

  // Vẽ trung tâm trắng
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}

function startIdleRotation() {
  stopIdleRotation();
  idleAnimation = anime({
    targets: wheel,
    totalAngle: `+=${Math.PI * 2}`,
    duration: 20000,
    easing: "linear",
    loop: true,
    update: drawWheel,
  });
}

function stopIdleRotation() {
  if (idleAnimation) {
    idleAnimation.pause();
    idleAnimation = null;
  }
}

function spinWheel() {
  if (!wheel || namesArray.value.length === 0) return;

  stopIdleRotation();

  const spins = Math.floor(Math.random() * 5) + 5;
  const targetAngle = wheel.totalAngle + spins * Math.PI * 2 + Math.random() * Math.PI * 2;

  anime({
    targets: wheel,
    totalAngle: targetAngle,
    duration: spinTime.value * 1000,
    easing: "easeOutExpo",
    update: drawWheel,
    complete: stopRotateWheel,
  });
}

function stopRotateWheel() {
  const winningIndex =
    Math.floor(
      wheel.sectors.length - ((wheel.totalAngle % (2 * Math.PI)) / (2 * Math.PI)) * wheel.sectors.length
    ) % wheel.sectors.length;

  showConfetti.value = true;
  winner.value = wheel.sectors[winningIndex].label;

  setTimeout(() => {
    showConfetti.value = false;
    showWinnerDialog.value = true;
    startIdleRotation(); // Quay chậm trở lại sau khi chọn người thắng
  }, 2000);
}
</script>

<style scoped>
.wheel-container {
  display: flex;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.wheel-wrapper {
  position: relative;
}

.spin-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: #1a1a1a;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.arrow {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%) rotate(90deg);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid white;
}

.sidebar {
  margin-left: 20px;
  width: 300px;
}

.entries-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.entry-controls {
  display: flex;
  gap: 5px;
}

.entry-controls button {
  background-color: #3a3a3a;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 200px;
  background-color: #2a2a2a;
  color: white;
  border: 1px solid #4a4a4a;
  padding: 10px;
  border-radius: 5px;
  resize: vertical;
}

.spin-settings {
  margin-top: 20px;
}

.spin-settings label {
  display: block;
  margin-bottom: 5px;
}

.spin-settings input {
  width: 100%;
  padding: 5px;
  background-color: #2a2a2a;
  color: white;
  border: 1px solid #4a4a4a;
  border-radius: 3px;
}

.confetti {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
}
/* Add confetti animation here */
</style>
