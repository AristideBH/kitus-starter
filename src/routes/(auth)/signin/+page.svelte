<script lang="ts">
	import SigninForm from '$lib/components/forms/SigninForm.svelte';

	let { data } = $props();
</script>

<SigninForm data={data.form} />
