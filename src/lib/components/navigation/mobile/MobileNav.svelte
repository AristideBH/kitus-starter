<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import * as Drawer from '$lib/components/ui/drawer';

	import NavItemFragment from '../NavItemFragment.svelte';
	import NavItemSub from '../mobile/NavItemSub.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import { page } from '$app/stores';
	let { project_name, project_descriptor, project_url } = $page.data.global;

	let { menu }: { menu: Collections.Menus } = $props();

	let open = $state(false);
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger>
		<Button variant="outline" size="icon" aria-label="Open menu">
			<Menu class="s-4" />
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="h-[80vh]">
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
		<menu class="flex flex-col px-8 text-xl">
			{#each menu.items as item}
				{#if item.type === 'list'}
					<NavItemSub {item} />
				{:else}
					<Drawer.Close>
						<NavItemFragment {item} />
					</Drawer.Close>
				{/if}
			{/each}
		</menu>
		<Drawer.Footer>
			<Drawer.Close><Button variant="outline" class="w-full">Close</Button></Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
<!-- <Sheet.Root bind:open>
	<Sheet.Trigger>
		<Button variant="outline" size="icon" aria-label="Open menu">
			<Menu class="s-4" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content class="px-inline flex flex-col justify-between gap-4">
		<Sheet.Header class="flex-row justify-between">
			<img class="mt-1 size-14" src="/icons/favicon.svg" alt="Logo" />

			<Sheet.Close class="ms-auto">
				<Button variant="outline" size="icon">
					<X class="h-4 w-4" />
					<span class="sr-only">Close</span>
				</Button>
			</Sheet.Close>
		</Sheet.Header>
		<menu
			class="m-0 mx-auto flex w-full max-w-xs grow list-none flex-col justify-center gap-8 px-4 pb-28 pt-14 text-2xl [&>*]:!grow-0"
		>
			{#each menu.items as item}
				{#if item.type === 'list'}
					<NavItemSub {item} />
				{:else}
					<Sheet.Close>
						<NavItemFragment {item} />
					</Sheet.Close>
				{/if}
			{/each}
		</menu>
		<Sheet.Footer class="flex flex-row justify-end gap-1">footer</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root> -->
