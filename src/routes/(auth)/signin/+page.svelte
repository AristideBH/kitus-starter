<script lang="ts">
	import SigninForm from '$lib/components/forms/SigninForm.svelte';

	let { data } = $props();
</script>

<section>
	<SigninForm data={data.form} />
</section>
