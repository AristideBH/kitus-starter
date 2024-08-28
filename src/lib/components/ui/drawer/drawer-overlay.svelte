<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import { cn } from '$lib/logic/utils.js';
	import { fade } from 'svelte/transition';

	type $$Props = DrawerPrimitive.OverlayProps;

	export let el: $$Props['el'] = undefined;
	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = fade;
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 150
	};
	export { className as class };
</script>

<DrawerPrimitive.Overlay
	bind:el
	{transition}
	{transitionConfig}
	class={cn('fixed inset-0 z-50 bg-black/80', className)}
	{...$$restProps}
>
	<slot />
</DrawerPrimitive.Overlay>
