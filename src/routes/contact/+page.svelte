<script lang="ts">
	import ContactForm from '$lib/components/forms/ContactForm.svelte';

	export let data;
</script>

<ContactForm data={data.form} />
