<!-- 
@component
Provides a main layout component that applies a grid layout and handles page transitions.

Props:
  - `children` (Snippet): The content to be rendered inside the main layout
  - `transitionKey` (string): A unique key used to trigger the page transition animation
  - `options` (Object): Optional options for the page transition animation
    - `duration` (number): The duration of the page transition animation in milliseconds (default: 300)
    - `delta` (number): The delay before the page transition animation starts in milliseconds (default: 150)
    - `y` (number): The vertical offset of the page transition animation in pixels (default: 50)
    - `x` (number): The horizontal offset of the page transition animation in pixels (default: 0)

-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { afterNavigate, disableScrollHandling } from '$app/navigation';
	import { fly } from 'svelte/transition';

	type Props = {
		children: Snippet;
		transitionKey: string;
		options?: {
			duration?: number;
			delta?: number;
			y?: number;
			x?: number;
		};
	};

	let { children, transitionKey, options = {} }: Props = $props();
	let { duration = 300, delta = 150, y = 50, x = 0 } = $derived(options);

	afterNavigate(() => {
		disableScrollHandling();
		setTimeout(() => {
			scrollTo({ top: 0, behavior: 'instant' });
		}, duration);
	});
</script>

{#key transitionKey}
	<main
		class="grid-layout"
		in:fly={{ y, x, delay: delta + duration }}
		out:fly={{ duration, y: -y, x: -x }}
	>
		{@render children()}
	</main>
{/key}
