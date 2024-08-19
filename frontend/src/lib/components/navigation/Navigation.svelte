<script lang="ts">
	import { MediaQuery } from 'runed';
	import { page } from '$app/stores';
	import DesktopNav from './desktop/DesktopNav.svelte';
	import MobileNav from './mobile/MobileNav.svelte';
	import { browser } from '$app/environment';

	let screen = $state(browser ? new MediaQuery('(min-width: 859px)') : null);
	const { headerNav: menu } = $page.data;
</script>

<nav class="pointer-events-auto flex flex-row items-center gap-6 xl:gap-10">
	{#if screen?.matches}
		<DesktopNav {menu} />
	{:else}
		<MobileNav {menu} />
	{/if}
</nav>
