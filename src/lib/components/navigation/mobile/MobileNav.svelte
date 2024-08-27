<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import { Button } from '$lib/components/ui/button';
	import Menu from 'lucide-svelte/icons/menu';
	import * as Drawer from '$lib/components/ui/drawer';

	import NavItemFragment from '../NavItemFragment.svelte';
	import NavItemSub from '../mobile/NavItemSub.svelte';
	import { page } from '$app/stores';
	let { project_name, project_descriptor } = $page.data.global;

	let { menu }: { menu: Collections.Menus } = $props();

	let open = $state(false);
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger>
		<Button variant="border" size="icon" aria-label="Open menu">
			<Menu class="s-4" />
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="h-[80vh] ">
		<Drawer.Header class="flex items-start gap-3 px-8 pt-8 text-left">
			<a href="/">
				<img
					class="size-11"
					height="44"
					width="44"
					src="/icons/favicon.svg"
					alt="Logo {project_name}"
				/>
			</a>
			<p class="leading-5">
				<span class="font-extrabold">{project_name}</span>
				<br />
				<span class="small">{project_descriptor}</span>
			</p>
		</Drawer.Header>
		<nav class=" flex flex-col gap-8 overflow-auto p-8 text-3xl">
			{#each menu.items as item}
				{#if item.type === 'list'}
					<NavItemSub {item} />
				{:else}
					<Drawer.Close>
						<NavItemFragment {item} class="!w-full" />
					</Drawer.Close>
				{/if}
			{/each}
		</nav>
		<Drawer.Footer>
			<Drawer.Close>
				<Button variant="outline" class="w-full hover:bg-muted">Close</Button>
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
