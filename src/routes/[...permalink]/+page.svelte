<script lang="ts">
	import Render from '$lib/components/editor/Render.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	let { data } = $props();
	let { title, editor } = data.page;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if editor}
	<Render {editor} />
{/if}
