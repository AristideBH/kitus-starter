<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { Snippet } from 'svelte';
	import type { Attrs, TipTapNode } from '..';
	import { setMarks, setTextAlign } from '../index.svelte';
	import { spring } from 'svelte/motion';

	type Props = {
		content?: TipTapNode[];
		class?: string;
		children?: Snippet;
		attrs?: Attrs;
	};

	let start = 200;
	let end = 900;
	let weight = $state(start);
	let element = $state<HTMLHeadingElement>();
	let intersecting = $state<boolean>(false);
	const weightSpring = spring(start, { stiffness: 0.025, damping: 0.25 });

	$effect(() => {
		return weightSpring.subscribe((value) => {
			weight = Math.round(value);
		});
	});

	$effect(() => {
		if (intersecting === true) {
			weightSpring.set(end);
		} else {
			weightSpring.set(start);
		}
	});

	let { content, class: className, children, attrs }: Props = $props();
</script>

<IntersectionObserver {element} bind:intersecting rootMargin={'0% 0% -17.5% 0%'}>
	<h1 style="--wght:{weight}" class=" {setTextAlign(attrs)} {className ?? ''}" bind:this={element}>
		{#if content}
			{#each content as item}
				{#if item.marks}
					<span class={setMarks(item.marks)}>{item.text}</span>
				{:else}
					<span>{item.text}</span>
				{/if}
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</h1>
</IntersectionObserver>
