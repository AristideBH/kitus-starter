import { writable } from "svelte/store";

export let isDrawerOpen = writable(false);
export const closeDrawer = () => isDrawerOpen.set(false);
export const openDrawer = () => isDrawerOpen.set(true);