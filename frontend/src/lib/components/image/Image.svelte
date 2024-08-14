<script lang="ts">
	import { client, type Client, type DirectusImagePreset } from '$lib/logic/directus';
	import type { CustomDirectusFile } from '$types/custom';
	import { onMount, getContext } from 'svelte';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
	import { readFile, readItem } from '@directus/sdk';
	const directus = getContext('directus') as Client;

	let {
		directusFile,
		alt,
		preset,
		transformations,
		lazy,
		className
	}: {
		directusFile: CustomDirectusFile;
		alt?: string;
		preset?: DirectusImagePreset;
		transformations?: Record<string, string | number> | null;
		lazy?: boolean;
		className?: string;
	} = $props();

	let loaded = $state(false);
	let inView = $state(false);
	let imgElement: HTMLElement;
	let id: string | undefined;

	const fetchFileInfo = async (id: string) => {
		return await directus.request(readFile(id, { fields: ['id', 'title', 'width', 'height', 'focal_point_y', 'focal_point_x', 'thumbhash', 'description'] })); 
	};

	if (typeof directusFile === 'string') {
		id = directusFile;
	} else {
		id = directusFile?.id;
	}

	const getImgUrl = (
		id: string,
		preset?: string | null,
		transformations?: Record<string, string | number> | null
	) => {
		const baseUrl = `${PUBLIC_DIRECTUS_URL}/assets/`;

		if (preset) {
			return `${baseUrl}${id}?key=${preset}`;
		}

		if (transformations) {
			const params = new URLSearchParams();
			for (const [key, value] of Object.entries(transformations)) {
				params.append(key, value.toString());
			}
			return `${baseUrl}${id}?${params.toString()}`;
		}

		return `${baseUrl}${id}`;
	};

	let src = $state(getImgUrl(id ?? '', preset ?? null, transformations ?? null));

	onMount(() => {
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

{#await fetchFileInfo(id) then value}
	<pre>{JSON.stringify(value, null, 2)}</pre>
{/await}

<figure class={`${className}`} bind:this={imgElement}>
	{#if inView}
		<img {src} {alt} loading={lazy ? 'lazy' : 'eager'} onload={() => handleLoad} />
	{:else}
		<div class="placeholder">loading</div>
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
