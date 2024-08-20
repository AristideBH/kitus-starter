<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import { findLink, findCode, setMarks } from '../';

	let { content }: { content: TipTapNode[] } = $props();
</script>

{#if content}
	<p class=" text-pretty">
		{#each content as item}
			{#if item.type === 'text'}
				{#if item.marks}
					{@const link = findLink(item.marks)}
					{@const code = findCode(item.marks)}
					{#if link}
						{@const { rel, href, target } = link.attrs}
						<a class={setMarks(item.marks)} {rel} {href} {target}>{item.text}</a>
					{:else if code}
						<code>{item.text}</code>
					{:else}
						<span class={setMarks(item.marks)}>{item.text}</span>
					{/if}
				{:else}
					{item.text}
				{/if}
			{:else if item.type === 'hardBreak'}
				<br />
			{/if}
		{/each}
	</p>
{/if}
