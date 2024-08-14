<script lang="ts">
	import Image from '$lib/components/image/Image.svelte';
	export let data;

	let { img } = data;
</script>

<h1 class="small">Welcome to Starterkit</h1>

<summary>
	<details>
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
<pre>{JSON.stringify(img, null, 2)}</pre>

<Image directusFile={img} preset="768" lazy={true} />
