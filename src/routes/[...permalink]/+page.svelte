<script lang="ts">
	import Render from '$lib/components/editor/Render.svelte';
	import Builder from '$lib/components/editor/Builder.svelte';
	let { data } = $props();
	let { page, editor } = data;
</script>

<svelte:head>
	<title>{page.title}</title>
</svelte:head>

<Builder nodes={editor} />

<!-- {#if editor}
	<Render {editor} />
{/if} -->
