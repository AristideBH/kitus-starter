<script lang="ts">
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';

	import { formSchema, type FormSchema } from '$lib/types/forms/login';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import { Loader2 } from 'lucide-svelte';

	let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(formSchema),
		resetForm: false,
		onResult: (e) => {
			if (e.result.type === 'success') toast.success('Successful connection');
		},
		onError: (e) => {
			toast.error(e.result.error.message);
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance class="flex flex-col gap-4">
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} required />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input {...props} bind:value={$formData.password} type="password" required />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button disabled={$delayed ? true : false} class="ms-auto w-fit">
		Submit
		{#if $delayed}
			<Loader2 class="ms-2 h-4 w-4 animate-spin" />
		{/if}
	</Form.Button>
</form>
