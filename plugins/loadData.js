import { useStore } from "~/store/useStore";
export default defineNuxtPlugin(async () => {
    const store = useStore();
    if (process.client) {
        await store.initializeRealtimeListeners()
      }
})