<script lang="ts">
	import type { TipTapNode } from '.';
	import type { Collections } from '$lib/types/client';

	import Section from '../layout/Section.svelte';
	import Builder from './Builder.svelte';
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
		LoadingState,
		Video,
		Button
	} from './index.svelte';

	const renderState = new LoadingState();
	type Props = { nodes?: TipTapNode[] };

	let { nodes }: Props = $props();
	$effect(() => renderState.ready());
</script>

{#if renderState.state === 'ready' && nodes}
	{#each nodes as node}
		{#if node?.editor}
			{@const { type, editor } = node}
			{#if type === 'section'}
				<Section content={node}>
					<Builder nodes={editor.content} />
				</Section>
			{:else if type === 'stack' && editor.content}
				<Stack content={node}>
					<Builder nodes={editor.content} />
				</Stack>
			{/if}

			<!-- Todo : fix gallery variants -->
		{:else}
			{@const { type, content, attrs } = node}
			{#if 'content' in node}
				{#if type === 'heading' && attrs}
					{#if attrs.level && attrs.level.toString() === '1'}
						<AnimatedHeading {content} />
					{:else}
						<Heading {content} {attrs} />
					{/if}
				{:else if type === 'paragraph'}
					<Paragraph {content} {attrs} />
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
				{@const { type } = node}
				{#if type === 'horizontalRule'}
					<hr class=" border-secondary" />
				{:else if type === 'quote'}
					<Quote content={node as Collections.Quote} />
				{:else if type === 'image'}
					<Image content={node as Collections.Image} />
				{:else if type === 'video'}
					<Video content={node as Collections.Video} />
				{:else if type === 'slider' || type === 'masonry' || type === 'scroll'}
					<Gallery content={node as Collections.Gallery} />
				{:else if type === 'button'}
					<Button content={node as Collections.Button} />
				{/if}
			{/if}
		{/if}
	{/each}
{/if}
