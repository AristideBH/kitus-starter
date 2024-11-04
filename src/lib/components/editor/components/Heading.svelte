<script lang="ts">
	import type { Attrs, TipTapNode } from '../index.d';
	import { setMarks, setTextAlign } from '../index.svelte';

	type Props = {
		content: TipTapNode[];
		class?: string;
		attrs?: Attrs;
	};

	let { content, class: className, attrs }: Props = $props();
</script>

<svelte:element this={'h' + attrs?.level} class=" {setTextAlign(attrs)} {className ?? ''}">
	{#each content as item}
		{#if item.marks}
			<span class={setMarks(item.marks)}>{item.text}</span>
		{:else}
			<span>{item.text}</span>
		{/if}
	{/each}
</svelte:element>
