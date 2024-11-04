<script lang="ts">
	import type { Collections } from '$lib/types/client';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import NavItemFragment from '../NavItemFragment.svelte';
	import NavItemSub from './NavItemSub.svelte';

	type Props = {
		item: Collections.MenuItems;
	};

	let { item }: Props = $props();
	let { label, children } = item;
</script>

<DropdownMenu.Sub>
	<DropdownMenu.SubTrigger class="gap-2">
		{label}
	</DropdownMenu.SubTrigger>
	<DropdownMenu.SubContent>
		{#each children as child}
			{#if child.type === 'list'}
				<NavItemSub item={child} />
			{:else}
				<DropdownMenu.Item>
					<NavItemFragment item={child} class="no-underline" />
				</DropdownMenu.Item>
			{/if}
		{/each}
	</DropdownMenu.SubContent>
</DropdownMenu.Sub>
