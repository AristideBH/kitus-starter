<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Builder from '../Builder.svelte';
	import { Checkbox } from '$components/ui/checkbox';

	type Props = {
		content: TipTapNode[];
	};

	let { content }: Props = $props();
</script>

<ul>
	{#each content as item}
		{@const checked = item.attrs?.checked}
		<li class="flex gap-3">
			<Checkbox {checked} disabled class="!cursor-default" />
			<Builder nodes={item.content} />
		</li>
	{/each}
</ul>
