<script lang="ts">
	import Render from '$lib/components/editor/Render.svelte';

	let { data } = $props();
	let { title, editor } = data.page;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>

{#if editor}
	<Render {editor} />
{/if}
