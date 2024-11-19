import { defineStore } from "pinia";
import { ref, set, onValue, remove, get } from "firebase/database";
import { db } from "~/firebase/firebase.js";

const createDefaultState = () => ({
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
});

export const useStore = defineStore("store", {
  state: () => ({
    games: {},
    deletedGames: new Set()
  }),

  actions: {
    async fetchGames() {
      try {
        const gamesRef = ref(db, 'games');
        const snapshot = await get(gamesRef);
        
        if (snapshot.exists()) {
          const games = snapshot.val();
          
          // Initialize games that haven't been deleted
          Object.entries(games).forEach(([gameId, gameData]) => {
            if (!this.deletedGames.has(gameId)) {
              this.games[gameId] = {
                ...createDefaultState(),
                ...gameData
              };
            }
          });
        }
        
      } catch (error) {
        throw error;
      }
    },

    async createGame(gameId) {
      this.deletedGames.delete(gameId);
      
      const gameRef = ref(db, `games/${gameId}`);
      const defaultData = createDefaultState();
      
      try {
        await set(gameRef, defaultData);
        this.games[gameId] = defaultData;
      } catch (error) {
        throw error;
      }
    },

    async updateGameData(gameId, path, value) {
      if (this.deletedGames.has(gameId)) {
        return;
      }

      const gameRef = ref(db, `games/${gameId}/${path}`);
      try {
        await set(gameRef, value);
        
        // Update local state
        if (!this.games[gameId]) {
          this.games[gameId] = createDefaultState();
        }
        
        const pathParts = path.split('/');
        let current = this.games[gameId];
        for (let i = 0; i < pathParts.length - 1; i++) {
          if (!current[pathParts[i]]) {
            current[pathParts[i]] = {};
          }
          current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = value;
        
      } catch (error) {
        throw error;
      }
    },

    async resetGameData(gameId) {
      if (this.deletedGames.has(gameId)) {
        return;
      }

      const gameRef = ref(db, `games/${gameId}`);
      const defaultData = createDefaultState();
      
      try {
        await set(gameRef, defaultData);
        this.games[gameId] = defaultData;
      } catch (error) {
        throw error;
      }
    },

    async deleteGame(gameId) {
      try {
        this.deletedGames.add(gameId);
        const gameRef = ref(db, `games/${gameId}`);
        await remove(gameRef);
        delete this.games[gameId];
      } catch (error) {
        this.deletedGames.delete(gameId);
        throw error;
      }
    },

    clearStore() {
      this.games = {};
      this.deletedGames.clear();
    }
  },
});