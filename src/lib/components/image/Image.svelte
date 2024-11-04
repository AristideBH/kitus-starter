<!-- 
@component
The `<Image/>` component is a Svelte component that renders an image with various custom options, specially developed with Directus API in mind.

Props:
- `item`: A `CustomDirectusFile` object or a string representing the ID of the image file.
- `alt`: The alternative text for the image.
- `title`: The title of the image.
- `preset`: A `DirectusImagePreset` object that DirectusClients the image preset to be used.
- `transformations`: An object that defines any transformations to be applied to the image.
- `class`: The CSS class to be applied to the image container.
- `showCaption`: A boolean that determines whether to show the image caption.
- `loading`: The loading strategy for the image, either "lazy" or "eager".

The component uses the `getFileInfos`, `getImgSrcSet`, `getImgUrl`, `getThumbhashUrl`, and `setIntersectionObserver` functions to fetch and display the image. It also uses an intersection observer to detect when the image container is in the viewport and load the image accordingly.
-->

<script lang="ts">
	import type { CustomDirectusFile, DirectusClient } from '$lib/logic/directus';
	import { getContext } from 'svelte';
	import {
		getFileInfos,
		getImgSrcSet,
		getImgUrl,
		getThumbhashUrl,
		setIntersectionObserver,
		type ImageProps
	} from '.';
	const directus = getContext<DirectusClient>('directus');

	// * COMPONENTS PROPS
	let {
		item,
		alt,
		title,
		preset,
		transformations,
		class: className,
		showCaption = false,
		loading = 'lazy',
		aspectOverwrite = false
	}: ImageProps = $props();

	// * COMPONENTS STATE
	let inView = $state(false);
	let fetchedFile = $state<CustomDirectusFile>({});
	let imgContainer: HTMLElement;
	let imgEl: HTMLImageElement;
	let id = typeof item === 'string' ? item : item?.id;
	let src = $state('');
	let srcset = $state('');
	let thumbhashUrl = $state('');
	let aspectRatio = $derived(fetchedFile?.width! / fetchedFile?.height!);
	let elWidth = $state<number>(0);
	let elHeight = $derived(elWidth / aspectRatio);

	$effect(() => {
		if (typeof id === 'string') {
			getFileInfos(directus, id).then((data) => {
				// Get full file informations if provided id is a string
				fetchedFile = data;
			});
		} else {
			fetchedFile = item as CustomDirectusFile; // Else, just use the item
		}

		if (loading === 'eager') {
			inView = true; // If loading is set to eager, set inView to true
		}

		// Run intersection observer to detect if ImgContainer is in viewport
		if (imgContainer) {
			return setIntersectionObserver(imgContainer, () => (inView = true));
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
		if (fetchedFile?.type !== 'image/png') {
			imgEl.style.backgroundImage = `url(${thumbhashUrl})`;
		}
		if (fetchedFile?.focal_point_x && fetchedFile?.focal_point_y) {
			imgEl.style.objectPosition = `${fetchedFile?.focal_point_x}% ${fetchedFile?.focal_point_y}%`;
		}
	});
</script>

<figure class={`${className ?? ''}`} bind:this={imgContainer} bind:offsetWidth={elWidth}>
	<img
		{src}
		{srcset}
		{loading}
		alt={alt || fetchedFile?.description || ''}
		title={title || fetchedFile?.title || ''}
		width={elWidth}
		height={elHeight}
		class:not-loaded={!inView}
		class:aspect-video={!aspectOverwrite}
		bind:this={imgEl}
	/>
	{#if showCaption && inView && fetchedFile?.description}
		<figcaption class="small">
			{alt || fetchedFile?.description || ''}
		</figcaption>
	{/if}
</figure>

<style>
	figure {
		overflow: hidden;
		position: relative;
		width: 100%;

		&:hover figcaption,
		&:focus figcaption {
			opacity: 0.65;
		}
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		background-size: 100%;
		transition: all ease-in-out 0.3s;
		object-fit: cover;
		max-height: 70dvh;
	}

	.not-loaded {
		filter: blur(100px);
	}

	figcaption {
		bottom: 0;
		left: 0;
		padding: 0.5em 0.75em;
		position: absolute;
		transition: opacity 0.175s ease-in-out;
		background-color: hsl(var(--background));
		opacity: 0;
		width: 100%;
		z-index: 5;
		text-align: center;
		&:empty {
			display: none;
		}
	}
</style>
