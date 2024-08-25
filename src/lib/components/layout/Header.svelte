<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { page } from '$app/stores';
	let { project_name, project_descriptor, project_url } = $page.data.global;
</script>

<header class="sticky bottom-0 z-50 bg-muted py-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<a href="/">
				<img
					class="size-11"
					height="44"
					width="44"
					src="/icons/favicon.svg"
					alt="Logo {project_name}"
				/>
			</a>
			<p class="leading-5">
				<span class="font-extrabold">{project_name}</span>
				<br />
				<span class="small">{project_descriptor}</span>
			</p>
		</div>
		<Navigation />
	</div>
</header>
