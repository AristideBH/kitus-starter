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
		<div class="flex gap-3 capitalize">
			<span>© All rights reserved </span>
			{#if $page.data.token}
				<a href="/profile">profile</a>
				<a href="/logout" data-sveltekit-preload-data="off">logout</a>
			{:else}
				<a href="/signin">signin</a>
				<a href="/login">login</a>
			{/if}
		</div>
	</div>
</footer>
