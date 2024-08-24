<script lang="ts">
	import NavItemFragment from '../navigation/NavItemFragment.svelte';
	import { page } from '$app/stores';

	const { footerNav: menu } = $page.data;
</script>

<footer class="mt-auto pb-4 pt-24">
	<div class="small flex items-center justify-between border-t pt-4">
		<nav class="flex gap-3">
			{#if $page.data.token}
				<a href="/profile">Profile</a>
				<a href="/logout" data-sveltekit-preload-data="off">Logout</a>
			{:else}
				<a href="/signin">Sign in</a>
				<a href="/login">Log in</a>
			{/if}
			{#each menu.items as item}
				<NavItemFragment {item} class="w-fit grow-0" />
			{/each}
		</nav>
		<span>© All rights reserved </span>
	</div>
</footer>
