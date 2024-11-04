<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Builder from '../Builder.svelte';

	type Props = {
		content: TipTapNode[];
		class?: string;
	};

	let { content, class: className }: Props = $props();
</script>

<blockquote class="{className ?? ''} lead">
	{#each content as item}
		<Builder nodes={item.content} />
		{item.content[0].text}
	{/each}
</blockquote>
