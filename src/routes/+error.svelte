<script lang="ts">
	import { page } from '$app/stores';

	const status = structuredClone($page.status);
	const error = structuredClone($page.error);
	import * as Alert from '$lib/components/ui/alert';
</script>

<section>
	<Alert.Root class="mx-auto max-w-md">
		<Alert.Title level="h1">Error {status}</Alert.Title>
		<Alert.Description>{error?.message}</Alert.Description>
	</Alert.Root>
</section>
