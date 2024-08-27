<script lang="ts">
	import type { Collections } from '$types/client';
	import * as Drawer from '$lib/components/ui/drawer';
	import NavItemFragment from '../NavItemFragment.svelte';

	let { item }: { item: Collections.MenuItems } = $props();
	let { label, children } = item;
</script>

<div class="0 flex flex-col gap-4">
	<h4 class="text-muted-foreground">{label}</h4>
	<div class="flex flex-col gap-4 border-s-2 border-secondary ps-5">
		{#each children as child}
			<Drawer.Close>
				<NavItemFragment item={child} class="!w-full" />
			</Drawer.Close>
		{/each}
	</div>
</div>
