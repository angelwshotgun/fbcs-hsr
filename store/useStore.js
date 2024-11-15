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
    listeners: {},
    deletedGames: new Set(),
    isInitialized: false, // Add flag to track initialization status
  }),

  actions: {
    // New function to initialize listeners for all existing games
    async initializeRealtimeListeners() {
      if (this.isInitialized) {
        console.warn('Realtime listeners already initialized');
        return;
      }

      try {
        // Get all existing games
        const gamesRef = ref(db, 'games');
        const snapshot = await get(gamesRef);
        
        if (snapshot.exists()) {
          const games = snapshot.val();
          
          // Initialize listeners for each existing game
          Object.keys(games).forEach(gameId => {
            if (!this.deletedGames.has(gameId) && !this.listeners[gameId]) {
              this.initializeGame(gameId);
            }
          });

          // Also set up a listener for new games being added
          const unsubscribe = onValue(gamesRef, (snapshot) => {
            const currentGames = snapshot.val() || {};
            
            // Handle removed games
            Object.keys(this.games).forEach(gameId => {
              if (!currentGames[gameId] && !this.deletedGames.has(gameId)) {
                this.cleanup(gameId);
              }
            });
            
            // Handle new games
            Object.keys(currentGames).forEach(gameId => {
              if (!this.deletedGames.has(gameId) && !this.listeners[gameId]) {
                this.initializeGame(gameId);
              }
            });
          });

          // Store the main listener
          this.listeners['_main'] = unsubscribe;
        }

        this.isInitialized = true;
        console.log('Realtime listeners initialized successfully');
      } catch (error) {
        console.error('Error initializing realtime listeners:', error);
        throw error;
      }
    },

    // Modified cleanup to handle single game or all games
    cleanup(gameId = null) {
      if (gameId) {
        // Cleanup specific game
        if (this.listeners[gameId]) {
          this.listeners[gameId]();
          delete this.listeners[gameId];
        }
        delete this.games[gameId];
        this.deletedGames.add(gameId);
      } else {
        // Cleanup all games
        if (this.listeners['_main']) {
          this.listeners['_main']();
        }
        
        Object.values(this.listeners).forEach(unsubscribe => {
          if (typeof unsubscribe === 'function') {
            unsubscribe();
          }
        });
        
        this.listeners = {};
        this.games = {};
        this.deletedGames.clear();
        this.isInitialized = false;
      }
    },

    // Rest of the existing actions remain the same
    initializeGame(gameId) {
      if (this.deletedGames.has(gameId)) {
        return;
      }

      if (this.listeners[gameId]) {
        return;
      }

      const gameRef = ref(db, `games/${gameId}`);
      const unsubscribe = onValue(gameRef, (snapshot) => {
        const data = snapshot.val();
        
        if (!this.deletedGames.has(gameId)) {
          if (data) {
            this.games[gameId] = {
              ...createDefaultState(),
              ...data
            };
          } else {
            delete this.games[gameId];
          }
        }
      });

      this.listeners[gameId] = unsubscribe;
    },

    async createGame(gameId) {
      this.deletedGames.delete(gameId);
      
      const gameRef = ref(db, `games/${gameId}`);
      const defaultData = createDefaultState();
      
      try {
        await set(gameRef, defaultData);
        this.games[gameId] = defaultData;
        this.initializeGame(gameId);
        console.log(`Game ${gameId} created successfully`);
      } catch (error) {
        console.error(`Error creating game ${gameId}:`, error);
      }
    },

    async updateGameData(gameId, path, value) {
      if (this.deletedGames.has(gameId)) {
        console.warn(`Cannot update deleted game ${gameId}`);
        return;
      }

      const gameRef = ref(db, `games/${gameId}/${path}`);
      try {
        await set(gameRef, value);
        console.log(`Updated ${path} for game ${gameId}`);
      } catch (error) {
        console.error(`Error updating game ${gameId} at ${path}:`, error);
      }
    },

    async resetGameData(gameId) {
      if (this.deletedGames.has(gameId)) {
        console.warn(`Cannot reset deleted game ${gameId}`);
        return;
      }

      const gameRef = ref(db, `games/${gameId}`);
      const defaultData = createDefaultState();
      
      try {
        await set(gameRef, defaultData);
        this.games[gameId] = defaultData;
        console.log(`Game ${gameId} reset successfully`);
      } catch (error) {
        console.error(`Error resetting game ${gameId}:`, error);
      }
    },

    async deleteGame(gameId) {
      try {
        this.deletedGames.add(gameId);

        if (this.listeners[gameId]) {
          this.listeners[gameId]();
          delete this.listeners[gameId];
        }

        const gameRef = ref(db, `games/${gameId}`);
        await remove(gameRef);

        delete this.games[gameId];

        console.log(`Game ${gameId} deleted successfully`);
      } catch (error) {
        this.deletedGames.delete(gameId);
        console.error(`Error deleting game ${gameId}:`, error);
        throw error;
      }
    },
  },
});