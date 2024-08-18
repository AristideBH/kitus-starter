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
					{@const { editor } = content}
					<section>
						<svelte:self {editor}></svelte:self>
					</section>
				{:else if 'image' in content}
					<Image {content} />
				{:else if 'text' in content}
					<Quote {content} />
				{:else if 'images' in content}
					<Gallery {content} />
					<!-- todo MENULINKS  -->
					<!-- {:else if 'label' in content}
					{@const { type, url, label, page } = content}
					<section>
						{#if type === 'url'}
							<Button variant="outline" href={url} class="w-fit">{label}</Button>
						{:else if type === 'page' && typeof page != 'string'}
							<Button variant="outline" href={page?.permalink} class="w-fit no-underline">
								{label}
							</Button>
						{/if}
					</section>
					-->
				{/if}
			{/if}
		{/await}
	{/if}
{/each}
