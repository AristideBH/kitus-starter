<script lang="ts">
	import NavItemFragment from '../navigation/NavItemFragment.svelte';
	import { page } from '$app/stores';

	const { footerNav: menu } = $page.data;
</script>

<footer class="mt-auto bg-muted pt-4">
	<div class="small flex flex-wrap items-center justify-between border-b border-secondary pb-4">
		<nav class="flex flex-wrap gap-2">
			{#each menu.items as item}
				<NavItemFragment {item} class="w-fit grow-0 !text-muted-foreground" />
			{/each}
		</nav>
		<span class="flex flex-wrap gap-2"
			>{#if $page.data.token}
				<a href="/profile">Profile</a>
				<a href="/logout" data-sveltekit-preload-data="off">Logout</a>
			{:else}
				<a href="/signin">Sign in</a>
				<a href="/login">Log in</a>
			{/if}</span
		>
	</div>
</footer>

<style lang="postcss">
	a,
	span {
		@apply text-muted-foreground;
	}
</style>
