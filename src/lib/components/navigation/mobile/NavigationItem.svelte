<script lang="ts">
	import { page } from '$app/stores';

	let { href, text }: { href: string; text: string } = $props();
</script>

<li class="font-heading w-fit">
	<a
		{href}
		class:decoration-4={$page.url.pathname === href}
		class="underline-offset-8 transition-all duration-300 hover:decoration-4"
	>
		{text}
	</a>
</li>
