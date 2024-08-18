<script lang="ts">
	import type { Collections } from '$lib/types/client';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import NavItemFragment from '../NavItemFragment.svelte';
	import NavItemSub from './NavItemSub.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let { menu }: { menu: Collections.Menus } = $props();
</script>

<div class="flex gap-6 xl:gap-8">
	{#each menu.items as item}
		<!-- {#if item.type === 'list'}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="flex items-center gap-1">
					{item.label}
					<ChevronDown class="size-5" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each item.children as child}
						{#if child.type === 'list'}
							<NavItemSub item={child} />
						{:else}
							<DropdownMenu.Item>
								<NavItemFragment item={child} class="no-underline" />
							</DropdownMenu.Item>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else} -->
		<NavItemFragment {item} class="top no-underline" />
		<!-- {/if} -->
	{/each}
</div>
