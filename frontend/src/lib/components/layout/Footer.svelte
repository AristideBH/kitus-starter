<script lang="ts">
	import NavItemFragment from '../navigation/NavItemFragment.svelte';
	import { page } from '$app/stores';

	const { footerNav: menu } = $page.data;
</script>

<footer class=" mt-auto pb-4 pt-24">
	<div class="small flex items-center justify-between border-t pt-4">
		<nav class="flex gap-3">
			{#each menu.items as item}
				<NavItemFragment {item} class="w-fit grow-0" />
			{/each}
		</nav>
		<span>© All rights reserved </span>
	</div>
</footer>

<style lang="postcss">
	:global(footer *) {
		@apply text-foreground/50;
	}
</style>
