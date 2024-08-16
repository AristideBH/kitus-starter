<script lang="ts">
	import { Image } from '$lib/components/image/';

	let { data } = $props();
</script>

<section class="grid gap-6 py-8">
	<h1>Welcome to Starterkit</h1>

	<p class="lead">A custom boilerplate for Sveltekit and Directus</p>
	<summary class="bg-muted list-none rounded-sm p-4">
		<details open={true}>
			<ul class="mt-4">
				<li>Svelte 5 & Sveltekit</li>
				<li>Directus SDK and decicated functions</li>
				<li>Client Types & Schema sync</li>
				<li>Authentification & account page</li>
				<li>Tailwind and shadcn-svelte</li>
				<li>Pages transitions</li>
				<li>
					Components :
					<ul>
						<li>Image</li>
						<li>Pagination</li>
						<li>Flexible Builder</li>
					</ul>
				</li>
			</ul>
		</details>
	</summary>

	<Image item={data.img} />
</section>
