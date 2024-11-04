<script lang="ts">
	import type { Collections } from '$types/client';
	import * as Drawer from '$lib/components/ui/drawer';
	import NavItemFragment from '../NavItemFragment.svelte';
	import NavItemSub from './NavItemSub.svelte';
	import { closeDrawer } from './index.svelte';

	type Props = {
		item: Collections.MenuItems;
		labelTag?: 'h4' | 'h5' | 'h6';
		class?: string;
	};

	let { item, labelTag = 'h4', class: classname }: Props = $props();
	let { label, children } = item;
</script>

<div class="flex flex-col gap-4">
	<svelte:element this={labelTag} class="text-muted-foreground">{label}</svelte:element>
	<div class="flex flex-col gap-4 border-s-2 border-secondary ps-5 {classname ?? ''}">
		{#each children as child}
			{#if child.type === 'list'}
				<NavItemSub item={child} labelTag="h6" class="text-2xl" />
			{:else}
				<NavItemFragment item={child} class="!w-full" onclick={closeDrawer} />
			{/if}
		{/each}
	</div>
</div>
