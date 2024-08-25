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
	class:!p-5={content && color}
	class:text-background={color === 'primary'}
	class:h-fit={fit_height}
>
	{@render children()}
</div>
