<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Collections } from '$lib/types/client';
	import NavItemFragment from '../NavItemFragment.svelte';
	export let item: Collections.MenuItems;
</script>

<DropdownMenu.Sub>
	<DropdownMenu.SubTrigger class="gap-2">
		{item.label}
	</DropdownMenu.SubTrigger>
	<DropdownMenu.SubContent>
		{#each item.children as child}
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
