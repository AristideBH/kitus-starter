<script lang="ts">
	import type { TipTapEditor } from './index.d';
	import type { DirectusClient } from '$lib/logic/directus';

	import { getContext, onMount } from 'svelte';
	const directus = getContext<DirectusClient>('directus');

	import {
		Heading,
		Paragraph,
		BulletList,
		OrderedList,
		Blockquote,
		Quote,
		Gallery,
		Image,
		elementQuery
	} from './';
	import Button from '../ui/button/button.svelte';

	let { editor }: { editor: TipTapEditor } = $props();
	let state: 'loading' | 'ready' = $state('loading');

	onMount(() => (state = 'ready'));
</script>

{#each editor.content as item}
	{@const { type, content, attrs } = item}
	<!-- DEFAULTS COMPONENTS -->
	{#if type === 'heading' && attrs}
		<Heading level={attrs.level} {content} />
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

		<!-- CUSTOM COMPONENTS -->
	{:else if type === 'relation-block' && state === 'ready'}
		{#await elementQuery(directus, attrs) then content}
			{#if content}
				{#if 'editor' in content}
					{@const { editor, width, color } = content}
					<section
						class:full-width={width === 'full-bleed'}
						class="bg-{color}"
						class:p-6={color != 'none'}
						class:rounded={color != 'none' && width != 'full-bleed'}
					>
						<svelte:self {editor}></svelte:self>
					</section>
				{:else if 'image' in content}
					<Image {content} />
				{:else if 'text' in content}
					<Quote {content} />
				{:else if 'images' in content}
					<Gallery {content} />
				{:else if 'label' in content}
					{@const { label, variant, size, type, url, page, new_tab } = content}
					<Button
						{variant}
						{size}
						href={type === 'page' && typeof page != 'string' ? `/${page?.permalink}` : url}
						target={new_tab && type === 'url' ? '_blank' : ''}>{label}</Button
					>
				{/if}
			{/if}
		{/await}
	{/if}
{/each}
