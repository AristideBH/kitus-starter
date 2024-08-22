<script lang="ts">
	import AnimatedHeading from '$lib/components/editor/custom/AnimatedHeading.svelte';
	import Image from '$lib/components/image/Image.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	let { data } = $props();
	let { home } = data;
</script>

<Section content={{ width: 'full-width', color: 'none' }}>
	<Image item={home?.img!} class="max-h-96" loading="eager" />
</Section>
<Section>
	<AnimatedHeading class="mb-0 ~text-6xl/9xl">Kitus Starter</AnimatedHeading>
	<p class="lead mb-10 italic text-primary">A custom starter template for Sveltekit & Directus</p>
	<details open class="list-none rounded-sm bg-muted p-4">
		<summary>Détails</summary>
		<ul class="!mt-4">
			<li>Svelte 5 & Sveltekit</li>
			<li>Directus SDK and decicated functions</li>
			<li>Client Types & Schema sync</li>
			<li>Authentification & account page</li>
			<li>Tailwind, shadcn-svelte and fluid plugin</li>
			<li>Pages transitions & animated sections</li>
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
</Section>
