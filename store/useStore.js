import { defineStore } from "pinia";
import { ref, set, onValue, update } from "firebase/database";
import { db } from "~/firebase/firebase.js";

const defaultState = {
  ban: {
    bc1: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    bc2: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    bc3: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    bc4: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    bl1: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    bl2: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
  },
  character: {
    c1: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c2: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c3: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c4: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c5: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c6: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c7: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c8: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c9: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c10: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c11: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c12: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c13: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c14: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c15: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
    c16: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0] },
  },
  lightcone: {
    l1: { img: "", name: "", path: "", point: [] },
    l2: { img: "", name: "", path: "", point: [] },
    l3: { img: "", name: "", path: "", point: [] },
    l4: { img: "", name: "", path: "", point: [] },
    l5: { img: "", name: "", path: "", point: [] },
    l6: { img: "", name: "", path: "", point: [] },
    l7: { img: "", name: "", path: "", point: [] },
    l8: { img: "", name: "", path: "", point: [] },
    l9: { img: "", name: "", path: "", point: [] },
    l10: { img: "", name: "", path: "", point: [] },
    l11: { img: "", name: "", path: "", point: [] },
    l12: { img: "", name: "", path: "", point: [] },
    l13: { img: "", name: "", path: "", point: [] },
    l14: { img: "", name: "", path: "", point: [] },
    l15: { img: "", name: "", path: "", point: [] },
    l16: { img: "", name: "", path: "", point: [] },
  },
  state: {
    bc1: { team: "blue", name: "ban", disable: false },
    bc2: { team: "red", name: "ban", disable: false },
    c1: { team: "blue", name: "pick", disable: false },
    c2: { team: "red", name: "pick", disable: false },
    c3: { team: "red", name: "pick", disable: false },
    c4: { team: "blue", name: "pick", disable: false },
    point: {
      redp: {
        char: [0,0,0,0,0,0,0,0,0],
        lc: [0,0,0,0,0,0,0,0,0]
      },
      bluep: {
        char: [0,0,0,0,0,0,0,0],
        lc: [0,0,0,0,0,0,0,0]
      }
    },
  },
  timer: 90,
};

export const useStore = defineStore("store", {
  state: () => ({ ...defaultState }),

  actions: {
    initializeRealtimeListeners() {
      const gameRef = ref(db, 'game')

      onValue(gameRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          this.ban = data.ban || this.ban
          this.character = data.character || this.character
          this.lightcone = data.lightcone || this.lightcone
          this.state = data.state || this.state
          this.timer = data.timer !== undefined ? data.timer : this.timer;
        }
      })
    },
    updateGameData(path, value) {
      const gameRef = ref(db, `game/${path}`)
      set(gameRef, value)
    },
    resetGameData() {
      const gameRef = ref(db, 'game')
      set(gameRef, defaultState)
        .then(() => {
          console.log("Game data reset successfully")
          // Cập nhật lại state trong Pinia store
          this.$patch(defaultState)
        })
        .catch((error) => {
          console.error("Error resetting game data:", error)
        })
    },
    startTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.timer = 90;
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          this.updateGameData('timer', this.timer); // Sync timer to Firebase
        } else {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    }
    
  },
});