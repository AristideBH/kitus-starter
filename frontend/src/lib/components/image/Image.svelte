<script lang="ts">
	import { type Client, type DirectusImagePreset } from '$lib/logic/directus';
	import type { CustomDirectusFile } from '$types/custom';
	import { onMount, getContext } from 'svelte';
	import { fetchFileInfo, getImgUrl } from '.';

	const directus = getContext('directus') as Client;

	let {
		item,
		alt,
		preset,
		transformations,
		lazy = true,
		className
	}: {
		item: CustomDirectusFile;
		alt?: string;
		preset?: DirectusImagePreset;
		transformations?: Record<string, string | number> | null;
		lazy?: boolean;
		className?: string;
	} = $props();

	let loaded = $state(false);
	let inView = $state(false);
	let fetchedFile = $state<CustomDirectusFile | undefined>(undefined);
	let imgElement: HTMLElement;
	let id = typeof item === 'string' ? item : item?.id;

	let src = $state(getImgUrl(id ?? '', preset ?? null, transformations ?? null));

	onMount(() => {
		if (typeof id === 'string') {
			fetchFileInfo(directus, id).then((data) => {
				fetchedFile = data;
			});
		} else {
			fetchedFile = item;
		}

		if (!lazy) {
			inView = true;
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					inView = true;
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: '-10px' }
		);

		if (imgElement) observer.observe(imgElement);

		return () => observer.disconnect();
	});

	const handleLoad = () => (loaded = true);
</script>

<figure class={`${className ?? ''}`} bind:this={imgElement}>
	{#if inView}
		<img
			{src}
			alt={alt ?? (typeof fetchedFile !== 'string' ? fetchedFile?.description : '')}
			loading={lazy ? 'lazy' : 'eager'}
			onload={() => handleLoad}
			width={fetchedFile?.width}
			height={fetchedFile?.height}
		/>
	{/if}
</figure>

<style>
	figure {
		overflow: hidden;
	}

	img {
		display: block;
		/* width: 100%; */
		height: auto;
	}

	.placeholder {
		background-color: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
