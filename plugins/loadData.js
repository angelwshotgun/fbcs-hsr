import { useStore } from "~/store/useStore";
export default defineNuxtPlugin(async () => {
    const store = useStore();
    await store.fetchGames()
})