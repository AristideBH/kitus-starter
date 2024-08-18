<script lang="ts">
	import { MediaQuery } from 'runed';
	import { page } from '$app/stores';
	import DesktopNav from './desktop/DesktopNav.svelte';
	import MobileNav from './mobile/MobileNav.svelte';

	// const screen = new MediaQuery('(min-width: `859px`)');

	const { headerNav: menu } = $page.data;
</script>

<nav class="container pointer-events-auto flex flex-row items-center gap-6 py-4 xl:gap-10">
	<!-- {#if screen.matches} -->
	<DesktopNav {menu} />
	<!-- {:else} -->
	<!-- <MobileNav {menu} /> -->
	<!-- {/if} -->
	<a href="/terms-and-conditions">test</a>
</nav>
