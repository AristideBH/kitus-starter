<script lang="ts">
	import EditProfile from '$lib/components/forms/EditProfile.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	let { data } = $props();
</script>

<Section>
	<h1>Bienvenue {data.user.first_name}</h1>
</Section>

<Section content={{ template: 'inherit-main' }}>
	<EditProfile />
</Section>
