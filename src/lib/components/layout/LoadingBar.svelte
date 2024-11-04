<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div
	transition:slide={{ axis: 'y' }}
	class="progress-bar absolute left-0 right-0 top-0 col-span-full h-[3px] w-full overflow-hidden bg-accent opacity-35"
>
	<span class="progress-bar-value h-full w-full origin-left bg-primary"></span>
</div>

<style>
	span {
		animation: indeterminateAnimation 0.75s infinite linear;
	}

	@keyframes indeterminateAnimation {
		0% {
			transform: translateX(0) scaleX(0);
		}
		40% {
			transform: translateX(0) scaleX(0.4);
		}
		100% {
			transform: translateX(100%) scaleX(0.5);
		}
	}
</style>
