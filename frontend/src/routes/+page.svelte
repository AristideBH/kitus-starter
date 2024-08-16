<script lang="ts">
	import { Image } from '$lib/components/image/';

	let { data } = $props();
</script>

<section class="grid gap-6 py-8">
	<h2>Welcome to Starterkit</h2>

	<p>A custom boilerplate for Sveltekit and Directus</p>
	<summary class="bg-muted list-none rounded-sm p-4">
		<details open>
			<ul class="mt-4">
				<li>Sveltekit</li>
				<li>Directus</li>
				<li>Types sync</li>
				<li>Authentification</li>
				<li>Tailwind and Shadcn-svelte</li>
				<li>Pages transitions</li>
				<li>
					Components
					<ul>
						<li>Image</li>
						<li>Pagination</li>
						<li>Load preprocessor</li>
					</ul>
				</li>
			</ul>
		</details>
	</summary>

	<Image item={data.img} />
</section>
