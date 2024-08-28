<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import { readCollections } from '@directus/sdk';
	import { YouTube, Vimeo } from 'sveltekit-embed';
	let { content }: { content: Collections.Video } = $props();

	type VideoService = 'youtube' | 'vimeo';

	const {
		service,
		id,
		autoplay: autoPlay
	} = content.video_link as {
		service: VideoService;
		id: string;
		autoplay: boolean;
	};
</script>

{#if service === 'youtube'}
	<YouTube youTubeId={id} {autoPlay} />
{:else if service === 'vimeo'}
	<Vimeo vimeoId={id} {autoPlay} />
{/if}
