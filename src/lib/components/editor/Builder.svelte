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
		Stack
	} from './index.svelte';

	class LoadingState {
		state: 'loading' | 'ready' = $state('loading');
		ready() {
			this.state = 'ready';
		}
		loading() {
			this.state = 'loading';
		}
	}
	const renderState = new LoadingState();

	let { nodes } = $props<{ nodes: any[] }>();
	onMount(() => renderState.ready());
</script>

{#if renderState.state === 'ready'}
	{#each nodes as node}
		{#if node?.editor}
			{@const { type, editor } = node}
			<!-- <pre>{JSON.stringify(node, null, 2)}</pre> -->

			{#if type === 'section'}
				<Section content={node}>
					<svelte:self nodes={editor.content} />
				</Section>
			{:else if type === 'stack' && editor.content}
				<Stack content={node}>
					<svelte:self nodes={editor.content} />
				</Stack>
			{/if}

			<!-- Todo : fix gallery, button -->
		{:else}
			{@const { type, content, attrs } = node}
			<!-- <pre>{JSON.stringify(node, null, 2)}</pre> -->

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
			{:else if type === 'quote'}
				<Quote content={node} />
			{:else if type === 'image'}
				<Image content={node} />
			{:else if type === 'slider' || type === 'masonry' || type === 'scroll'}
				<Gallery content={node} />
			{:else if type === 'url' || type === 'page'}
				<!-- todo : fix button -->
				<!-- {@const { label, variant, size, type, url, page, new_tab } = content} -->
				<!-- <Button
					{variant}
					{size}
					href={type === 'page' && typeof page != 'string' ? `/${page.permalink}` : url}
					target={new_tab && type === 'url' ? '_blank' : ''}
					class="w-fit"
				>
					{label}
				</Button> -->
			{:else}
				<!-- <pre>{JSON.stringify(node.type, null, 2)}</pre> -->
			{/if}
		{/if}
	{/each}
{/if}
