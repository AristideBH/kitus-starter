<script lang="ts">
	import type { Collections } from '$lib/types/client';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import NavItemFragment from '../NavItemFragment.svelte';
	import NavItemSub from './NavItemSub.svelte';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';

	type Props = {
		menu: Collections.Menus;
	};

	let open: boolean = $state(false);
	let { menu }: Props = $props();
</script>

<div class="flex gap-6 xl:gap-8">
	{#each menu.items as item}
		{#if item.type === 'list'}
			<DropdownMenu.Root bind:open>
				<DropdownMenu.Trigger class="flex items-center gap-1">
					{item.label}
					<ChevronUp class="mt-1 size-5 transition-transform {open ? 'rotate-180' : ''}" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each item.children as child}
						{#if child.type === 'list'}
							<NavItemSub item={child} />
						{:else}
							<DropdownMenu.Item class="p-0">
								<NavItemFragment item={child} class="px-2 py-1.5 no-underline" />
							</DropdownMenu.Item>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<NavItemFragment {item} class="top no-underline" />
		{/if}
	{/each}
</div>
