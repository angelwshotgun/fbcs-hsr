// stores/characterStore.js
import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: {},
    light_cones: {},
  }),
  actions: {
    async loadCharacters() {
      try {
        this.characters = await $fetch('https://fbcs-hsr.vercel.app/api/get-characters');
      } catch (error) {
        console.error('Error loading characters:', error);
      }
    },
    async saveCharactersToFile() {
      try {
        const response = await $fetch('https://fbcs-hsr.vercel.app/api/update-characters', {
          method: 'POST',
          body: { characters: this.characters }
        });

        if (!response.success) {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error saving characters:', error);
      }
    },
    async updateCharacterPoint(id, newPoints) {
      try {
        const response = await $fetch('/api/update-character-point', {
          method: 'POST',
          body: { id, newPoints }
        });
        if (response.success) {
          this.characters[id].point = newPoints;
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error updating character points:', error);
      }
    },
    async loadLightCone() {
      try {
        this.light_cones = await $fetch('/api/get-lightcones');
      } catch (error) {
        console.error('Error loading lightcones:', error);
      }
    },
    async saveLightconesToFile() {
      try {
        const response = await $fetch('/api/update-lightcones', {
          method: 'POST',
          body: { light_cones: this.light_cones }
        });

        if (!response.success) {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error saving light_cones:', error);
      }
    },
  }
});
