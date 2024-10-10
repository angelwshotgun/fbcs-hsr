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
    <Dialog v-model:visible="showWinnerDialog" modal :class="winnerDialogClass" header="Winner Announcement" :style="{ width: '50vw' }">
        <p>The winner is: <strong>{{ winner }}</strong></p>
      </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Dialog from "primevue/dialog";

const wheelCanvas = ref(null);
const showConfetti = ref(false);
const namesText = ref(
  "Ali\nBeatriz\nCharles\nDiya\nEric\nFatima\nGabriel\nHanna"
);
const namesArray = ref(
  namesText.value.split("\n").filter((name) => name.trim() !== "")
);
const showWinnerDialog = ref(false);
const winner = ref("");
const spinTime = ref(5);
let wheel = null;

onMounted(() => {
  initWheel();
});

watch(namesArray, initWheel, { deep: true });

function initWheel() {
  const canvas = wheelCanvas.value;
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  const colors = ["#3369e8", "#d50f25", "#eeb211", "#009925"];

  wheel = {
    sectors: namesArray.value.map((name, index) => ({
      color: colors[index % colors.length],
      label: name,
      startAngle: (index / namesArray.value.length) * 2 * Math.PI,
      endAngle: ((index + 1) / namesArray.value.length) * 2 * Math.PI,
    })),
    totalAngle: 0,
    spinSpeed: 0,
    spinAngleStart: 0,
  };

  drawWheel();
}

function drawWheel() {
  const canvas = wheelCanvas.value;
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

    // Change text color for specific sectors
    if (sector.color === "#eeb211" || sector.color === "#009925") {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = "#fff";
    }

    ctx.font = "bold 18px Arial";
    ctx.fillText(sector.label, canvas.width / 2 - 40, 0);
    ctx.restore();
  });

  // Draw white circle in the center
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}

function updateNamesArray() {
  namesArray.value = namesText.value
    .split("\n")
    .filter((name) => name.trim() !== "");
}

function shuffleNames() {
  namesArray.value = namesArray.value.sort(() => Math.random() - 0.5);
  namesText.value = namesArray.value.join("\n");
}

function sortNames() {
  namesArray.value = namesArray.value.sort();
  namesText.value = namesArray.value.join("\n");
}

function spinWheel() {
  if (wheel.spinSpeed > 0) return;

  wheel.spinAngleStart = wheel.totalAngle;
  wheel.spinSpeed = Math.random() * 10 + 20;
  wheel.spinTime = 0;
  wheel.maxSpinTime = spinTime.value * 1000; // Convert seconds to milliseconds

  rotateWheel();
}

function rotateWheel() {
  wheel.spinTime += 16; // Assuming 60 FPS (16ms per frame)

  if (wheel.spinTime >= wheel.maxSpinTime) {
    stopRotateWheel();
    return;
  }

  // Easing function for smooth deceleration (cubic ease-out)
  const spinProgress = wheel.spinTime / wheel.maxSpinTime;
  const easedProgress = 1 - Math.pow(1 - spinProgress, 3); // Cubic easing-out function

  // Calculate current spin speed based on eased progress
  const spinSpeed = wheel.spinSpeed * (1 - easedProgress);

  // Apply the spin movement
  wheel.totalAngle += spinSpeed * 0.016; // 0.016 is roughly 1/60th of a second, assuming 60 FPS

  drawWheel(); // Redraw the wheel with the new angle
  requestAnimationFrame(rotateWheel); // Keep animating until the spin time is complete
}

function stopRotateWheel() {
  const winningIndex =
    Math.floor(
      wheel.sectors.length -
        ((wheel.totalAngle % (2 * Math.PI)) / (2 * Math.PI)) *
          wheel.sectors.length
    ) % wheel.sectors.length;
  showConfetti.value = true;
  winner.value = wheel.sectors[winningIndex].label;
  setTimeout(() => {
    showConfetti.value = false;
    showWinnerDialog.value = true;
    // Reset spinSpeed to allow a new spin
    wheel.spinSpeed = 0;
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
