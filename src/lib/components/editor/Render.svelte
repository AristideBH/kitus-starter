<script lang="ts">
	import type { TipTapEditor } from './index.d';
	import type { DirectusClient } from '$lib/logic/directus';
	import Section from '$lib/components/layout/Section.svelte';
	import { getContext, onMount, setContext } from 'svelte';

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
		elementQuery
	} from './index.svelte';
	import Button from '../ui/button/button.svelte';
	import { type Collections } from '$lib/types/client';

	let { editor }: { editor: TipTapEditor } = $props();
	const directus = getContext<DirectusClient>('directus');
</script>

{#snippet btn(content: Collections.Button | null)}
	{#if content}
		{@const { label, variant, size, type, url, page, new_tab } = content}
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
{/snippet}

{#each editor.content as item}
	{@const { type, content, attrs } = item}
	<!-- * DEFAULTS COMPONENTS -->
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

		<!-- * CUSTOM COMPONENTS -->
	{:else if type === 'relation-block'}
		{#await elementQuery(directus, attrs)}
			laoding
		{:then content}
			{#if content}
				{#if 'editor' in content}
					{@const { editor } = content}
					<!-- {#if 'fit_height' in content}
							<Wrapper {content}>
								<svelte:self {editor} />
							</Wrapper>
						{:else}
							<Section {content}>
								<svelte:self {editor} />
							</Section>
						{/if} -->
				{:else if 'image' in content}
					<Image {content} />
				{:else if 'text' in content}
					<Quote {content} />
				{:else if 'images' in content}
					<Gallery {content} />
				{:else if 'buttons' in content}
					<div class="buttons-wrapper flex flex-wrap" class:gap-3={content.gap}>
						{#each content.buttons as button}
							{@render btn(button.item)}
						{/each}
					</div>
				{:else if 'label' in content}
					{@render btn(content)}
				{:else}{/if}
			{/if}
		{/await}
	{/if}
{/each}
