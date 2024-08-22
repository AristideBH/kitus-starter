<script lang="ts">
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	export let data;
</script>

<Section>
	<ContactForm data={data.form} />
</Section>
