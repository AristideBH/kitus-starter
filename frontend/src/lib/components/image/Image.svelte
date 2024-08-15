<!-- 
@component
The `<Image/>` component is a Svelte component that renders an image with various customization options, specially developed with Directus API in mind.

Props:
- `item`: A `CustomDirectusFile` object or a string representing the ID of the image file.
- `alt`: The alternative text for the image.
- `title`: The title of the image.
- `preset`: A `DirectusImagePreset` object that defines the image preset to be used.
- `transformations`: An object that defines any transformations to be applied to the image.
- `class`: The CSS class to be applied to the image container.
- `showCaption`: A boolean that determines whether to show the image caption.
- `loading`: The loading strategy for the image, either "lazy" or "eager".

The component uses the `fetchFileInfo`, `getImgSrcSet`, `getImgUrl`, `getThumbhashUrl`, and `setupIntersectionObserver` functions to fetch and display the image. It also uses an intersection observer to detect when the image container is in the viewport and load the image accordingly.
-->

<script lang="ts">
	import { type Client, type DirectusImagePreset } from '$lib/logic/directus';
	import type { CustomDirectusFile } from '$types/custom';
	import { onMount, getContext } from 'svelte';
	import {
		fetchFileInfo,
		getImgSrcSet,
		getImgUrl,
		getThumbhashUrl,
		setupIntersectionObserver
	} from '.';
	import type { Types } from '$lib/types/client';
	const directus = getContext('directus') as Client;

	// * COMPONENTS PROPS
	let {
		item,
		alt,
		title,
		preset,
		transformations,
		class: className,
		showCaption = false,
		loading = 'lazy'
	}: {
		item: CustomDirectusFile | Types.Optional<string>;
		alt?: string;
		title?: string;
		preset?: DirectusImagePreset;
		transformations?: Record<string, string | number> | null;
		class?: string;
		showCaption?: boolean;
		loading?: 'lazy' | 'eager';
	} = $props();

	// * COMPONENTS STATE
	let inView = $state(false);
	let fetchedFile = $state<CustomDirectusFile>({});
	let imgContainer: HTMLElement;
	let id = typeof item === 'string' ? item : item?.id;
	let src = $state('');
	let srcset = $state('');
	let thumbhashUrl = $state('');

	onMount(() => {
		if (typeof id === 'string') {
			// Get full file informations if provided id is a string
			fetchFileInfo(directus, id).then((data) => {
				fetchedFile = data;
			});
		} else {
			// Else, just use the item
			fetchedFile = item as CustomDirectusFile;
		}

		// If loading is set to eager, set inView to true
		if (loading === 'eager') {
			inView = true;
			return;
		}

		// Run intersection observer to detect if ImgContainer is in viewport
		if (imgContainer) {
			return setupIntersectionObserver(imgContainer, () => {
				inView = true;
			});
		}
	});

	$effect(() => {
		if (!inView && fetchedFile?.thumbhash) {
			// By default, set src to thumbhash url
			thumbhashUrl = getThumbhashUrl(fetchedFile?.thumbhash);
			src = thumbhashUrl;
		} else if (inView) {
			// Else, set src to image url
			src = getImgUrl(id ?? '', preset ?? null, transformations ?? null);
			srcset = getImgSrcSet(id ?? '');
		}
	});
</script>

<figure
	class={`${className ?? ''}`}
	bind:this={imgContainer}
	style="max-width:{fetchedFile?.width}px;"
>
	<img
		{src}
		{srcset}
		{loading}
		alt={alt || fetchedFile?.description || ''}
		title={title || fetchedFile?.title || ''}
		width={fetchedFile?.width}
		height={fetchedFile?.height}
		class:not-loaded={!inView}
	/>
	<!-- style="background-image:url({thumbhashUrl})" -->
	{#if showCaption && inView}
		<figcaption>
			{alt || fetchedFile?.description || ''}
		</figcaption>
	{/if}
</figure>

<style>
	figure {
		overflow: hidden;
		position: relative;
		width: 100%;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		background-size: 100%;
		transition: all ease-in-out 0.3s;
	}
	.not-loaded {
		filter: blur(100px);
	}

	figcaption {
		bottom: 0;
		left: 0;
		padding: 0.3em 0.75em;
		position: absolute;
		background-color: hsl(var(--background) / 0.5);
		&:empty {
			display: none;
		}
	}
</style>
