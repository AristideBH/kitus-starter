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
</script>

<IntersectionObserver {once} {element} {rootMargin}>
	<svelte:element
		this={tag}
		bind:this={element}
		use:inView={viewTimeline}
		data-inview
		class="relative {className ?? ''} bg-{color}"
		class:layout-full={width === 'full-width'}
		class:rounded={content && color != 'none' && width != 'full-width'}
		data-tinted={content && color != 'none' ? 'true' : 'false'}
		transition:flyAndScale={{ y: -20, start: 0.975 }}
	>
		{@render children()}
	</svelte:element>
</IntersectionObserver>
