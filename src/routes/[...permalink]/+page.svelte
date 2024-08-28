<script lang="ts">
	import Builder from '$lib/components/editor/Builder.svelte';
	let { data } = $props();
	let { page, editor } = data;
</script>

<svelte:head>
	<title>{page.title}</title>
</svelte:head>

{#if editor}
	<Builder nodes={editor} />
{/if}
