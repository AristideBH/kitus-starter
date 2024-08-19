<script lang="ts">
	import type { DirectusClient } from '$lib/logic/directus';
	import { readMenus } from '$lib/types/client';
	import NavItemFragment from '../navigation/NavItemFragment.svelte';
	import {page} from '$app/stores';

	const { footerNav: menu } = $page.data;

</script>

<footer class="container mt-auto py-4 flex gap-5 justify-between">
	<nav>
		{#each menu.items as item}
			<NavItemFragment {item} class="w-fit grow-0"/>
		{/each}
	</nav>
	<span>All rights reserved </span>
</footer>

