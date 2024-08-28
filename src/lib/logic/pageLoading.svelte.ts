import { writable } from "svelte/store";
export const loading = writable(false);
export const loadingTimeout = writable<NodeJS.Timeout | null>(null);
