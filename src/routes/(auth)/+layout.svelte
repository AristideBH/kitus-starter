<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import Section from '$lib/components/layout/Section.svelte';

	let title = `${$page.url.pathname.slice(1).charAt(0).toUpperCase()}${$page.url.pathname.slice(2)}`;

	let { children } = $props();
</script>

<Section>
	<Card.Root class="mx-auto w-full max-w-xl bg-muted">
		<Card.Header>
			<Card.Title class="mt-0 text-3xl">{title}</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-4 ">
			{@render children?.()}
		</Card.Content>
	</Card.Root>
</Section>
