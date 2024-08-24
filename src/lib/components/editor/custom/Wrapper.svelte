<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import type { Snippet } from 'svelte';

	type BlockProps = {
		class?: string;
		content?: Partial<Collections.Wrapper>;
		children: Snippet;
	};

	let { class: className, content, children }: BlockProps = $props();
	let color = $state(content?.color);
	let fit_height = $state(content?.fit_height);
</script>

<div
	class="block-wrapper {className ?? ''} bg-{color} flex flex-col gap-y-2"
	class:rounded={content && color}
	class:p-8={content && color}
	class:text-background={color === 'primary'}
	class:h-fit={fit_height}
>
	{@render children()}
</div>

<style lang="postcss">
	:global([data-template='sidebar-content']) {
		@apply !gap-0;
		& > :last-child {
			@apply -col-end-1;
		}
	}
</style>
