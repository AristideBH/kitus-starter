<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div
	transition:slide={{ axis: 'y' }}
	class="progress-bar absolute left-0 right-0 top-0 h-[3px] w-full overflow-hidden bg-accent"
>
	<div class="progress-bar-value h-full w-full bg-primary"></div>
</div>

<style>
	.progress-bar {
		grid-column: full;
	}

	.progress-bar-value {
		animation: indeterminateAnimation 1s infinite linear;
		transform-origin: 0% 50%;
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
