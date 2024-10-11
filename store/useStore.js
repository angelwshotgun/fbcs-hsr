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
    c1: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c2: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c3: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c4: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c5: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c6: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c7: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c8: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c9: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c10: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c11: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c12: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c13: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c14: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c15: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
    c16: { img: "", name: "", path: "", point: [0,0,0,0,0,0,0], e:0 },
  },
  lightcone: {
    l1: { img: "", name: "", path: "", point: [], s:0 },
    l2: { img: "", name: "", path: "", point: [], s:0 },
    l3: { img: "", name: "", path: "", point: [], s:0 },
    l4: { img: "", name: "", path: "", point: [], s:0 },
    l5: { img: "", name: "", path: "", point: [], s:0 },
    l6: { img: "", name: "", path: "", point: [], s:0 },
    l7: { img: "", name: "", path: "", point: [], s:0 },
    l8: { img: "", name: "", path: "", point: [], s:0 },
    l9: { img: "", name: "", path: "", point: [], s:0 },
    l10: { img: "", name: "", path: "", point: [], s:0 },
    l11: { img: "", name: "", path: "", point: [], s:0 },
    l12: { img: "", name: "", path: "", point: [], s:0 },
    l13: { img: "", name: "", path: "", point: [], s:0 },
    l14: { img: "", name: "", path: "", point: [], s:0 },
    l15: { img: "", name: "", path: "", point: [], s:0 },
    l16: { img: "", name: "", path: "", point: [], s:0 },
  },
  state: {
    data: {
      name: '',
    },
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
  team: 1,
  banpick: 1,
  stage: 12,
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
          this.banpick = data.banpick || this.banpick;
          this.team = data.team || this.team;
          this.stage = data.stage || this.stage;
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
  },
});