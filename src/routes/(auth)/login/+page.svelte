<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';

	let { data } = $props();
</script>

<section>
	<LoginForm data={data.form} />
</section>
