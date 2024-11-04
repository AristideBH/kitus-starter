<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		content: Partial<Collections.Stack>;
		children: Snippet;
	};

	let { class: className, content, children }: Props = $props();
	let { color, fit_height, direction, gap } = content;

	const setStyles = (node: HTMLElement) => {
		let isColorSet = !!color;
		let isGapSet = !!gap;
		let isHeightFit = !!fit_height;

		if (isGapSet) node.classList.add(`gap-${gap}`);
		if (isColorSet) node.classList.add(`bg-${color}`, 'p-5', 'rounded');
		if (color === 'primary') node.classList.add('text-primary-background');
		if (direction) node.classList.add(`flex-${direction}`);
		if (isHeightFit) node.classList.add('h-fit');
	};
</script>

<div class="block-wrapper {className ?? ''} flex" class:h-fit={fit_height} use:setStyles>
	{@render children()}
</div>

<style>
	:global(.block-wrapper p + p) {
		margin-top: 0;
	}
	.block-wrapper:empty {
		display: none;
	}
</style>
