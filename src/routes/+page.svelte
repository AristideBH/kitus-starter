<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let weight = $state(200);
</script>

<Section>
	<h1 style="--wght:{weight}">Kitus Starter</h1>
	<div class="mb-10 flex gap-4">
		<Label for="weight">Weight : <code>{weight}</code></Label>
		<input
			type="range"
			name="weight"
			id="weight"
			min="100"
			max="900"
			class="grow"
			bind:value={weight}
		/>
	</div>
	<p class="lead mb-1">A custom template for Sveltekit & Directus</p>
	<details open={true} class="list-none rounded-sm bg-muted p-4">
		<summary>Détails</summary>
		<ul class="!mt-4">
			<li>Svelte 5 & Sveltekit</li>
			<li>Directus SDK and decicated functions</li>
			<li>Client Types & Schema sync</li>
			<li>Authentification & account page</li>
			<li>Tailwind, shadcn-svelte and fluid plugin</li>
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
</Section>
