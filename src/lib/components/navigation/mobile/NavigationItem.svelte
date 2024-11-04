<script lang="ts">
	import { page } from '$app/stores';

	type Props = {
		href: string;
		text: string;
	};

	let { href, text }: Props = $props();
</script>

<li class="w-fit font-heading">
	<a
		{href}
		class:decoration-4={$page.url.pathname === href}
		class="underline-offset-8 transition-all duration-300 hover:decoration-4"
	>
		{text}
	</a>
</li>
