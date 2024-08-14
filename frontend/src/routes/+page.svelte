<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	export let data;

	let { img } = data.homepage;
</script>

{#snippet placeholder()}
	<span>Loading...</span>
{/snippet}

<h1>Welcome to Starterkit</h1>
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

<Image
	directusId={img as string}
	alt="Description of the image"
	preset="768"
	lazy={true}
	className="my-custom-class"
	placeholderSnippet={placeholder}
/>
