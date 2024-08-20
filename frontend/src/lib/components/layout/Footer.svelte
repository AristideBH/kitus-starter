<script lang="ts">
	import NavItemFragment from '../navigation/NavItemFragment.svelte';
	import { page } from '$app/stores';

	const { footerNav: menu } = $page.data;
</script>

<footer class=" mt-auto py-4">
	<div class="small flex items-center justify-between">
		<nav>
			{#each menu.items as item}
				<NavItemFragment {item} class="w-fit grow-0" />
			{/each}
		</nav>
		<span>© All rights reserved </span>
	</div>
</footer>
