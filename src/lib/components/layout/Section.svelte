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

	let color = $state(content?.color);
	let width = $state(content?.width);
	let template = $state(content?.template);
	let align = $state(content?.align);
</script>

<IntersectionObserver {once} {element} {rootMargin}>
	<svelte:element
		this={tag}
		bind:this={element}
		use:inView={viewTimeline}
		data-inview
		class:layout-full={width === 'full-width'}
		class:rounded={content && color && width != 'full-width'}
		class:p-8={content && color && width != 'full-width'}
		class:py-8={width === 'full-width'}
		class="relative bg-{color} items-{align} {className ?? ''}"
		data-template={template}
		transition:flyAndScale={{ y: -20, start: 0.975 }}
	>
		{@render children()}
	</svelte:element>
</IntersectionObserver>

<style lang="postcss">
	[data-template] {
		@apply gap-[var(--x-gap)];
	}
	[data-template='cols-2'] {
		@apply grid-cols-2;
	}
	[data-template='cols-3'] {
		@apply grid-cols-3;
	}
</style>
