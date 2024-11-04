<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '../ui/checkbox';
	import { Textarea } from '../ui/textarea';
	import { formSchema, type FormSchema } from '$lib/types/forms/contact';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { Loader2 } from 'lucide-svelte';

	let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();
	let formStatus = $state<'new' | 'submitting' | 'submitted'>('new');

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onResult: (e) => {
			if (e.result.type === 'success') {
				toast.success('Your message was sent successfully!');
				formStatus = 'submitted';
			}
		},
		onError: (e) => {
			toast.error(e.result.error.message);
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<Card.Root class="mx-auto w-full max-w-xl bg-muted">
	{#if formStatus === 'submitted'}
		<Card.Header>
			<Card.Title class="mt-0">Thanks for your message</Card.Title>
			<Card.Description>We will get back to you ASAP !</Card.Description>
			<Button
				class="!mt-4 w-fit"
				onclick={() => {
					formStatus = 'new';
				}}>Send another message</Button
			>
		</Card.Header>
	{:else if formStatus === 'new'}
		<Card.Header>
			<Card.Title class="mt-0">Interrested in working together ?</Card.Title>
		</Card.Header>
		<form method="POST" use:enhance>
			<Card.Content class="flex flex-col gap-4 ">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="message">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Message</Form.Label>
							<Textarea class="text-md" {...props} bind:value={$formData.message!} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="honeypot" class="hidden">
					<Form.Control>
						{#snippet children({ props })}
							<Checkbox {...props} bind:checked={$formData.honeypot as boolean} />
							<Form.Label class="!mt-0">Honeypot</Form.Label>
							<input name={props.name} value={$formData.honeypot} hidden />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="terms" class="flex items-center gap-2">
					<Form.Control>
						{#snippet children({ props })}
							<Checkbox {...props} bind:checked={$formData.terms as boolean} />
							<Form.Label class="!mt-0 text-balance leading-4 ">
								I agree to the
								<a href="/terms-and-conditions" target="_blank"> terms and conditions </a>
							</Form.Label>
							<input name={props.name} value={$formData.terms} hidden />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Content>

			<Card.Footer>
				<Form.Button disabled={$delayed ? true : false} class="ms-auto w-fit">
					Submit
					{#if $delayed}
						<Loader2 class="ms-2 h-4 w-4 animate-spin" />
					{/if}
				</Form.Button>
			</Card.Footer>
		</form>
	{/if}
</Card.Root>
