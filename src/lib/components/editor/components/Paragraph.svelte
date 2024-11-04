<script lang="ts">
	import type { Attrs, TipTapNode } from '../index.d';
	import { findLink, findCode, setMarks, findSub, findSup, setTextAlign } from '../index.svelte';

	type Props = {
		content: TipTapNode[];
		attrs?: Attrs;
	};

	let { content, attrs }: Props = $props();
</script>

{#if content}
	<p class={setTextAlign(attrs)}>
		{#each content as item}
			{#if item.type === 'text'}
				{#if item.marks}
					{@const link = findLink(item.marks)}
					{@const code = findCode(item.marks)}
					{@const sub = findSub(item.marks)}
					{@const sup = findSup(item.marks)}
					{#if link}
						{@const { rel, href, target } = link.attrs}
						<a class={setMarks(item.marks)} {rel} {href} {target}>
							{#if sub}
								<sub>
									{item.text}
								</sub>
							{:else if sup}
								<sup>{item.text}</sup>
							{:else}
								{item.text}
							{/if}
						</a>
					{:else if code}
						<code>{item.text}</code>
					{:else if sub}
						<sub>{item.text}</sub>
					{:else if sup}
						<sup>{item.text}</sup>
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

<style>
	.font-bold {
		font-weight: 700;
	}
</style>
