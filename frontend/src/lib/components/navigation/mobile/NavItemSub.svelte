<script lang="ts">
	import type { Collections } from '$types/client';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Sheet from '$lib/components/ui/sheet';

	import NavItemFragment from '../NavItemFragment.svelte';
	export let item: Collections.MenuItems;
</script>

<Accordion.Root>
	<Accordion.Item value="item-{item.label}" class="border-none">
		<Accordion.Trigger>
			{item.label}
		</Accordion.Trigger>
		<Accordion.Content>
			{#each item.children as child}
				{#if child.type === 'list'}
					<svelte:self item={child} />
				{:else}
					<Sheet.Close>
						<NavItemFragment item={child} />
					</Sheet.Close>
				{/if}
			{/each}
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
