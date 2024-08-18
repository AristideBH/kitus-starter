<script lang="ts">
	import type { Collections } from '$types/client';
	import { page } from '$app/stores';
	let { item, class: className }: { item: Collections.MenuItems; class?: string } = $props();
</script>

{#if item.type === 'url'}
	<a
		class={className ?? 'url'}
		href={item.url}
		target={item.open_in_new_tab ? '_blank' : ''}
		class:active={$page.data.pathName === item.url}
	>
		{item.label}
	</a>
{:else if item.type === 'page' && typeof item.page != 'string'}
	<a
		class={className ?? 'page'}
		href="/{item.page?.permalink}"
		class:active={$page.data.pathName.replace('/', '') === item.page?.permalink}
	>
		{item.label}
	</a>
{/if}

<style lang="postcss">
	a {
		@apply flex w-fit grow;
	}
	a.active {
		@apply flex flex-nowrap items-center gap-2;
		&::before {
			content: '';
			@apply bg-primary size-1 rounded;
		}
	}

	a.top::before {
		content: '';
		@apply scale-0 transition-transform;
	}
	a.top.active {
		@apply relative;
		&::before {
			content: '';
			@apply absolute -bottom-1 right-1/2 mx-auto h-1 w-full max-w-[30px] translate-x-1/2 translate-y-1/2 scale-100;
		}
	}
</style>
