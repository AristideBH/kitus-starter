<script lang="ts">
	import type { Collections } from '$types/client';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Sheet from '$lib/components/ui/sheet';
	import NavItemFragment from '../NavItemFragment.svelte';

	let { item }: { item: Collections.MenuItems } = $props();
	let { label, children } = item;
</script>

<Accordion.Root>
	<Accordion.Item value="item-{label}" class="border-none">
		<Accordion.Trigger>
			{label}
		</Accordion.Trigger>
		<Accordion.Content>
			{#each children as child}
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
