<script lang="ts">
	import type { Collections } from '$lib/types/client';
	import Image from '$lib/components/image/Image.svelte';

	let { content }: { content: Collections.Image } = $props();
	let { image, show_caption } = content;
</script>

<Image item={image} showCaption={show_caption!} />
