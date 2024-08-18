<script lang="ts">
	// import { mediaQuery } from 'svelte-legos';

	import { page } from '$app/stores';
	import DesktopNav from './desktop/DesktopNav.svelte';
	import MobileNav from './mobile/MobileNav.svelte';

	const menu = $page.data.headerNav;
	// const isDesktop = mediaQuery('(min-width: 859px)');
</script>

<nav class="container pointer-events-auto flex flex-row items-center gap-6 py-4 xl:gap-10">
	<!-- {#if $isDesktop} -->
	<DesktopNav {menu} />
	<!-- {:else} -->
	<!-- <MobileNav {menu} /> -->
	<!-- {/if} -->
</nav>
