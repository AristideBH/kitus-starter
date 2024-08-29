<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeftFromLine } from 'lucide-svelte';

	const status = structuredClone($page.status);
	const error = structuredClone($page.error);
</script>

<section>
	<Card.Root class="bg-muted">
		<Card.Header>
			<h1>Oops !</h1>
			<Card.Description>Erreur {status} : {error?.message}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Seems like the page you are looking doesn't exist !</p>
		</Card.Content>
		<Card.Footer class="flex gap-2">
			<Button
				variant="border"
				size="icon"
				title="Page précédente"
				onclick={() => {
					window.history.back();
					return false;
				}}
			>
				<ArrowLeftFromLine class="size-4" />
			</Button>
			<Button variant="default" href="/">Go back home</Button>
		</Card.Footer>
	</Card.Root>
</section>
