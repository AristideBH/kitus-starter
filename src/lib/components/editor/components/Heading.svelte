<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import { setMarks } from '../index.svelte';

	let {
		content,
		class: className,
		level = '1'
	}: {
		content: TipTapNode[];
		class?: string;
		level: '1' | '2' | '3' | '4' | '5' | '6' | undefined;
	} = $props();
</script>

<svelte:element this={'h' + level} class={className ?? ''}>
	{#each content as item}
		{#if item.marks}
			<span class={setMarks(item.marks)}>{item.text}</span>
		{:else}
			<span>{item.text}</span>
		{/if}
	{/each}
</svelte:element>
