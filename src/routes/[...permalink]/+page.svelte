<script lang="ts">
	import Builder from '$lib/components/editor/Builder.svelte';
	// import Seo from '@archangelgca/sk-seo';
	let { data } = $props();
	let { page, editor } = data;
</script>

<!-- <Seo title={page.seo_detail?.meta_title!} description={page.seo_detail?.meta_description!} /> -->

<Builder nodes={editor} />
