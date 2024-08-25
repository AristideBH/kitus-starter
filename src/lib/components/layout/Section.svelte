<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { type SectionProps, inView } from '$lib/logic/section';
	import { flyAndScale } from '$lib/logic/utils';

	// Variables
	let element = $state<HTMLElement>();
	let {
		tag = 'section',
		viewTimeline,
		once = true,
		rootMargin = '-50px',
		class: className,
		children,
		content
	}: SectionProps = $props();

	let template = $state(content?.template);
	const setStyles = (node: HTMLElement) => {
		let color = $state(content?.color);
		let width = $state(content?.width);
		let align = $state(content?.align);
		let isFullWidth = width === 'full-width';
		let isColorSet = color !== null;

		if (template) {
			node.setAttribute('data-template', template);
		} else {
			node.setAttribute('data-template', 'none');
		}
		if (isColorSet) node.classList.add(`bg-${color}`);
		if (align) node.classList.add(`items-${align}`);
		if (isFullWidth) node.classList.add('layout-full', 'py-12');
		if (!isFullWidth && isColorSet) node.classList.add('p-8', 'rounded');
	};
</script>

<IntersectionObserver {once} {element} {rootMargin}>
	<svelte:element
		this={tag}
		bind:this={element}
		use:inView={viewTimeline}
		transition:flyAndScale={{ y: -20, start: 0.975 }}
		use:setStyles
		class={className ?? ''}
	>
		{@render children()}
	</svelte:element>
</IntersectionObserver>

<style lang="postcss">
</style>
