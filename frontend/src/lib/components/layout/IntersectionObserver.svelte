<script lang="ts">
	type InViewParams = {
		trigger: Partial<{ start: UnitValue; end: UnitValue }>;
		distance: UnitValue;
	};

	type UnitValue = `${number}px` | `${number}em` | `${number}rem` | `${number}%`;

	// ViewTimeline
	const inViewDefaults: InViewParams = {
		distance: '50px',
		trigger: { start: '20rem', end: '10rem' }
	};

	import { onMount } from 'svelte';

	export let once = false;
	export let top = 0;
	export let bottom = 0;
	export let left = 0;
	export let right = 0;
	export let tag: 'section' | 'div' | 'article' = 'section';
	export let viewTimeline: InViewParams = inViewDefaults;

	let intersecting = false;
	let container: HTMLElement;
	let containerWidth: number;

	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;
			const observer = new IntersectionObserver(
				(entries) => {
					intersecting = entries[0].isIntersecting;

					if (intersecting && once) {
						observer.unobserve(container);
					}
				},
				{
					rootMargin
				}
			);
			observer.observe(container);
			return () => observer.unobserve(container);
		}
		function handler() {
			const { bottom, right, top, left } = container.getBoundingClientRect();
			intersecting =
				bottom + bottom > 0 &&
				right + right > 0 &&
				top - top < window.innerHeight &&
				left - left < window.innerWidth;
			if (intersecting && once) {
				window.removeEventListener('scroll', handler);
			}
		}
		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	});

	const translate = (distance: UnitValue) => {
		return {
			in: {
				opacity: [0, 1],
				transform: [`translateY(${distance})`, `translateY(0)`]
			},
			out: {
				opacity: [1, 0],
				transform: [`translateY(0px)`, `translateY(-${distance})`]
			}
		};
	};

	const inView = (node: HTMLElement, params: Partial<InViewParams> = inViewDefaults) => {
		const timeline = new ViewTimeline({
			subject: node,
			axis: 'block'
		});

		const { distance, trigger } = {
			...inViewDefaults,
			...params
		};

		node.animate(translate(distance).in, {
			fill: 'forwards',
			timeline,
			rangeStart: 'entry 0%',
			rangeEnd: `cover ${trigger?.start}`
		});

		node.animate(translate(distance).out, {
			fill: 'forwards',
			timeline,
			rangeStart: `cover calc(100% - ${trigger?.end})`,
			rangeEnd: 'exit 100%'
		});
	};
</script>

<svelte:element
	this={tag}
	bind:this={container}
	class={$$props.class ?? ''}
	bind:offsetWidth={containerWidth}
	use:inView={viewTimeline}
>
	<slot {intersecting} {containerWidth} />
</svelte:element>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
