<script lang="ts">
	export let href: string;
	export let text: string;
	import { page } from '$app/stores';
</script>

<li class="w-fit font-heading">
	<a
		on:click
		{href}
		class:decoration-4={$page.url.pathname === href}
		class="transition-all duration-300 underline-offset-8 hover:decoration-4"
	>
		{text}
	</a>
</li>
