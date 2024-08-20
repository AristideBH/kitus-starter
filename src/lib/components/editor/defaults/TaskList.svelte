<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Render from '../Render.svelte';
	import { Checkbox } from '$components/ui/checkbox';

	let { content }: { content: TipTapNode[] } = $props();
</script>

<ul>
	{#each content as item}
		{@const checked = item.attrs?.checked}
		<li class="flex gap-3">
			<Checkbox {checked} disabled class="!cursor-default" />
			<Render editor={item} />
		</li>
	{/each}
</ul>
