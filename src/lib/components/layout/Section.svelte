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

	let template = $derived(content?.template),
		color = $derived(content?.color),
		width = $derived(content?.width),
		border = $derived(content?.border),
		align = $derived(content?.align);

	const setStyles = (node: HTMLElement) => {
		const classes = {
			[`bg-${color}`]: !!color,
			[`items-${align}`]: !!align,
			'layout-full py-10': width === 'full-width',
			'p-7 rounded': width !== 'full-width' && !!color,
			[`border-${border} border p-7 rounded`]: !!border
		};

		node.setAttribute('data-template', template || 'none');
		Object.entries(classes).forEach(([className, condition]) => {
			if (condition) node.classList.add(...className.split(' '));
		});
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
		data-template="none"
	>
		{@render children()}
	</svelte:element>
</IntersectionObserver>
