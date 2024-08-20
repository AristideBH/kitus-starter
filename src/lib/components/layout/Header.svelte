<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
</script>

<header class="grid-layout sticky top-0 z-50 bg-muted py-4">
	<div class="flex items-center justify-between">
		<a href="/">
			<img class="size-14" src="/icons/favicon.svg" alt="Logo" />
		</a>
		<Navigation />
	</div>
</header>
