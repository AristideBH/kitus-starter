<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';

	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { getImgData } from '$lib/logic/directus';
	import Masonry from '$lib/components/layout/Masonry.svelte';
	import HorizontalScroll from '$lib/components/layout/HorizontalScroll.svelte';
	import Image from '$lib/components/image/Image.svelte';

	// - Masonry settings
	let outerWidth: number | undefined = $state();
	let colWidth: string | undefined = $state();

	$effect(() => {
		if (outerWidth && outerWidth > 768 && outerWidth < 1280) {
			colWidth = 'minmax(min(17.5em, 100%), 2fr)';
		} else if (outerWidth && outerWidth > 1280) {
			colWidth = 'minmax(min(20em, 100%), 1fr)';
		} else {
			colWidth = 'minmax(min(200px, 100%), 1fr)';
		}
	});

	// - Carousel settings
	let api = $state<CarouselAPI>();
	let current = $state(0);
	let count = $derived(api ? api.scrollSnapList().length : 0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});

	type Props = { content: Collections.Gallery };

	let { content }: Props = $props();
	let { images, type } = content;
</script>

{#snippet img(image: Collections.GalleryFiles, aspectOverwrite?: true)}
	{#await getImgData(image.directus_files_id) then res}
		{#if res}
			<Image item={res} {aspectOverwrite} />
		{/if}
	{/await}
{/snippet}

<svelte:window bind:outerWidth />

{#if images.length === 1}
	<Image item={images[0].directus_files_id} />
{:else if images.length > 1}
	{#if type === 'slider'}
		<Carousel.Root setApi={(emblaApi) => (api = emblaApi)} class="group" opts={{ align: 'start' }}>
			<Carousel.Content>
				{#each images as image}
					<Carousel.Item class="basis-5/6 ">
						{@render img(image)}
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous class="bottom-0 left-4" />
			<Carousel.Next class="bottom-0 right-4" />

			<!-- Pagination -->
			<div
				class="absolute bottom-4 left-1/2 flex -translate-y-1/2 items-center justify-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
			>
				{#each images as _, i}
					<span
						class="h-2 w-2 rounded border border-muted-foreground/30 bg-muted"
						class:shadow={i + 1 === current}
						class:bg-primary={i + 1 === current}
					></span>
				{/each}
			</div>
		</Carousel.Root>
	{:else if type === 'masonry'}
		<Masonry {colWidth}>
			{#each images as image}
				{#if image && typeof image != 'string'}
					{@render img(image, true)}
				{/if}
			{/each}
		</Masonry>
	{:else if type === 'scroll'}
		<HorizontalScroll>
			{#each images as image}
				{#if image && typeof image != 'string'}
					{@render img(image)}
				{/if}
			{/each}
		</HorizontalScroll>
	{/if}
{/if}
