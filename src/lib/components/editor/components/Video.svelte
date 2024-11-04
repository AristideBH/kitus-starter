<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import { YouTube, Vimeo } from 'sveltekit-embed';

	type Props = { content: Collections.Video };
	type VideoLink = {
		service: 'youtube' | 'vimeo';
		id: string;
		autoplay: boolean;
	};

	let { content }: Props = $props();

	const { service, id, autoplay: autoPlay } = content.video_link as VideoLink;
</script>

{#if service === 'youtube'}
	<YouTube youTubeId={id} {autoPlay} />
{:else if service === 'vimeo'}
	<Vimeo vimeoId={id} {autoPlay} />
{/if}
