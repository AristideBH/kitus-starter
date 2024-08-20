<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Collections } from '$lib/types/client';
	import NavItemFragment from '../NavItemFragment.svelte';

	let { item }: { item: Collections.MenuItems } = $props();
	let { label, children } = item;
</script>

<DropdownMenu.Sub>
	<DropdownMenu.SubTrigger class="gap-2">
		{label}
	</DropdownMenu.SubTrigger>
	<DropdownMenu.SubContent>
		{#each children as child}
			{#if child.type === 'list'}
				<svelte:self item={child} />
			{:else}
				<DropdownMenu.Item>
					<NavItemFragment item={child} class="no-underline" />
				</DropdownMenu.Item>
			{/if}
		{/each}
	</DropdownMenu.SubContent>
</DropdownMenu.Sub>
