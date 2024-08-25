<script lang="ts">
	import type { Collections } from '$types/client';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Drawer from '$lib/components/ui/drawer';
	import NavItemFragment from '../NavItemFragment.svelte';

	let { item }: { item: Collections.MenuItems } = $props();
	let { label, children } = item;
</script>

<div class="0 flex flex-col">
	<h4 class="text-muted-foreground">{label}</h4>
	{#each children as child}
		<!-- <pre>{JSON.stringify(item.label, null, 2)}</pre> -->
		<Drawer.Close>
			<NavItemFragment item={child} class="mt-5" />
		</Drawer.Close>
	{/each}
</div>

<!-- 
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
</Accordion.Root> -->
