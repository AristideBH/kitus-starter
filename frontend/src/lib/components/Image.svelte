<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
	import type { DirectusImagePreset } from '$lib/logic/directus';

	let {
		directusId,
		alt,
		width,
		height,
		preset,
		transformations,
		lazy,
		className,
		placeholderSnippet
	}: {
		directusId: string;
		alt: string;
		width?: number;
		height?: number;
		preset?: DirectusImagePreset;
		transformations?: Record<string, string | number> | null;
		lazy?: boolean;
		className?: string;
		placeholderSnippet?: Snippet;
	} = $props();

	let loaded = $state(false);
	let inView = $state(false);
	let imgElement: HTMLElement;

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

	let src = $state(getImgUrl(directusId, preset ?? null, transformations ?? null));

	onMount(() => {
		if (!lazy) {
			inView = true;
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					inView = true;
					console.log('🩺 > onMount > inView:', inView);
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

<figure class={`${className}`} bind:this={imgElement}>
	{#if inView}
		<img {src} {alt} loading={lazy ? 'lazy' : 'eager'} onload={() => handleLoad} />
	{:else if placeholderSnippet}
		<div class="placeholder">
			{@render placeholderSnippet()}
		</div>
	{/if}
</figure>

<style>
	figure {
		overflow: hidden;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
	}

	.placeholder {
		background-color: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
