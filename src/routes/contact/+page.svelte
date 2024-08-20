<script lang="ts">
	import ContactForm from '$lib/components/forms/ContactForm.svelte';

	export let data;
</script>

<section>
	<ContactForm data={data.form} />
</section>
