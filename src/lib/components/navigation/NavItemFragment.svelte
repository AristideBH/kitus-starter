<script lang="ts">
	import type { Collections } from '$types/client';
	import { page } from '$app/stores';

	type Props = {
		item: Collections.MenuItems;
		class?: string;
		onclick?: () => void;
	};

	let { item, class: className, onclick }: Props = $props();
</script>

{#if item.type === 'url'}
	<a
		class={className ?? ''}
		href={item.url}
		target={item.open_in_new_tab ? '_blank' : ''}
		class:active={$page.url.pathname === item.url}
		{...onclick ? { onclick } : {}}
	>
		{item.label}
	</a>
{:else if item.type === 'page' && typeof item.page != 'string'}
	<a
		class={className ?? ''}
		href="/{item.page?.permalink}"
		class:active={$page.url.pathname.replace('/', '') === item.page?.permalink}
		{...onclick ? { onclick } : {}}
	>
		{item.label}
	</a>
{/if}

<style lang="postcss">
	a {
		@apply flex w-fit grow text-foreground hover:no-underline;
	}
	a.active {
		@apply flex flex-nowrap items-center gap-2;
		&::before {
			content: '';
			@apply size-1.5 rounded bg-primary;
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
			@apply absolute -bottom-1 right-1/2 mx-auto h-1 w-full max-w-[4px] origin-center translate-x-1/2 translate-y-1/2 scale-100;
		}
	}
</style>
