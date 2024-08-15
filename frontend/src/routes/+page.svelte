<script lang="ts">
	import { Image } from '$lib/components/image/';
	export let data;

	let { img } = data;
</script>

<section class="grid gap-6">
	<h3>Welcome to Starterkit</h3>

	<summary>
		<details open>
			<p>A custom boilerplate for Sveltekit and Directus</p>
			<ul>
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
		<details open>
			<p>A custom boilerplate for Sveltekit and Directus</p>
			<ul>
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

	<!-- <pre>{JSON.stringify(img, null, 2)}</pre> -->

	<Image item={img} class="mb-8" showCaption={true} alt="Image" preset="50" />
</section>
