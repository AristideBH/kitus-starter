<script lang="ts">
	import Section from '../layout/Section.svelte';
	import { Button } from '../ui/button';
	import { onMount } from 'svelte';
	import {
		Heading,
		Paragraph,
		BulletList,
		OrderedList,
		Blockquote,
		Quote,
		Gallery,
		Image,
		AnimatedHeading,
		Stack,
		LoadingState
	} from './index.svelte';
	import type { TipTapNode } from '.';
	import { type Collections } from '$lib/types/client';

	const renderState = new LoadingState();

	let { nodes }: { nodes: TipTapNode[] } = $props();
	onMount(() => renderState.ready());
</script>

{#if renderState.state === 'ready'}
	{#each nodes as node}
		{#if node?.editor}
			<!-- - Wrappers nodes -->
			{@const { type, editor } = node}
			{#if type === 'section'}
				<Section content={node}>
					<svelte:self nodes={editor.content} />
				</Section>
			{:else if type === 'stack' && editor.content}
				<Stack content={node}>
					<svelte:self nodes={editor.content} />
				</Stack>
			{/if}

			<!-- Todo : fix gallery -->
		{:else}
			{@const { type, content, attrs } = node}
			{#if 'content' in node}
				<!-- - Default TipTap Nodes -->
				{#if type === 'heading' && attrs}
					{#if attrs.level.toString() === '1'}
						<AnimatedHeading {content} />
					{:else}
						<Heading level={attrs.level} {content} />
					{/if}
				{:else if type === 'paragraph'}
					<Paragraph {content} />
				{:else if type === 'horizontalRule'}
					<hr />
				{:else if type === 'bulletList'}
					<BulletList {content} />
				{:else if type === 'orderedList'}
					<OrderedList {content} />
				{:else if type === 'blockquote'}
					<Blockquote {content} />
				{:else if type === 'codeBlock'}
					<pre class="overflow-hidden whitespace-normal px-4 py-3 [&_p]:text-base">
						<Paragraph {content} />
					</pre>
				{/if}
			{:else}
				<!-- - Custom Elements -->
				{@const { type } = node}
				{#if type === 'quote'}
					<Quote content={node as Collections.Quote} />
				{:else if type === 'image'}
					<Image content={node as Collections.Image} />
				{:else if type === 'slider' || type === 'masonry' || type === 'scroll'}
					<Gallery content={node as Collections.Gallery} />
				{:else if type === 'button'}
					{@const { label, variant, size, type, url, page, new_tab } = node as Collections.Button}
					<Button
						{variant}
						{size}
						href={type === 'page' && typeof page != 'string' ? `/${page?.permalink}` : url}
						target={new_tab && type === 'url' ? '_blank' : ''}
						class="w-fit"
					>
						{label}
					</Button>
				{/if}
			{/if}
		{/if}
	{/each}
{/if}
