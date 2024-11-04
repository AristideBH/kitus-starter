<script lang="ts">
	const horizontalScroll = (section: HTMLElement) => {
		const sticky = section.querySelector('[data-hs="sticky"]') as HTMLElement;
		const wrap = section.querySelector('[data-hs="wrap"]') as HTMLElement;
		if (!sticky || !wrap) return;

		const padding = 'calc(var(--section-padding)/2)';
		const height = `calc(100vh - ${padding})`;

		section.style.height = '350vh';
		section.style.overflow = 'visible';

		sticky.style.height = height;
		sticky.style.width = '100vw';
		sticky.style.position = 'sticky';
		sticky.style.top = `calc(${padding} / 1.5)`;
		sticky.style.overflowX = 'hidden';

		wrap.style.height = height;
		wrap.style.width = '250vmax';

		wrap.animate(
			{
				transform: [``, `translateX(calc(-100% + 100vw))`],
				left: '0px'
			},
			{
				//@ts-expect-error TS does not yet include the ViewTimeline API type
				timeline: new ViewTimeline({
					subject: section,
					axis: 'block'
				}),
				fill: 'forwards',
				//@ts-expect-error TS does not yet include the ViewTimeline API type
				rangeStart: `contain 0%`,
				rangeEnd: `contain 100%`
			}
		);
	};
</script>

<div use:horizontalScroll data-hs="section">
	<div data-hs="sticky">
		<div data-hs="wrap">
			<slot />
		</div>
	</div>
</div>

<style>
	[data-hs='section'] {
		height: 100vh;
		width: 100%;
		display: flex;
		background: var(--text-color);
		color: var(--bg-color);
		overflow: scroll;
	}

	[data-hs='wrap'] {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--gap);
		min-height: 350px;
	}

	:global([data-hs='wrap']:has(img) img) {
		max-height: unset;
		height: 100%;
	}
</style>
