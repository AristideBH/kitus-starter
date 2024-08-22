<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	export let stretchFirst = false,
		gridGap = '0.5em',
		colWidth = 'minmax(min(17.6em, 100%), 2fr)',
		items: never[] = []; // pass in data if it's dynamically updated
	let grids: any[] = [],
		masonryElement: HTMLDivElement;
	let _window: Window & typeof globalThis;

	export const refreshLayout = async () => {
		grids.forEach(async (grid) => {
			/* get the post relayout number of columns */
			let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;

			grid.items.forEach(
				(c: {
					getBoundingClientRect: () => { (): any; new (): any; height: any };
					dataset: { h: string | number };
				}) => {
					let new_h = c.getBoundingClientRect().height;

					if (new_h !== +c.dataset.h) {
						c.dataset.h = new_h;
						grid.mod++;
					}
				}
			);

			/* if the number of columns has changed */
			if (grid.ncol !== ncol || grid.mod) {
				/* update number of columns */
				grid.ncol = ncol;
				/* revert to initial positioning, no margin */
				grid.items.forEach((c: { style: { removeProperty: (arg0: string) => any } }) =>
					c.style.removeProperty('margin-top')
				);
				/* if we have more than one column */
				if (grid.ncol > 1) {
					grid.items.slice(ncol).forEach(
						(
							c: {
								getBoundingClientRect: () => { (): any; new (): any; top: any };
								style: { marginTop: string };
							},
							i: string | number
						) => {
							let prev_fin =
									grid.items[i].getBoundingClientRect().bottom /* bottom edge of item above */,
								curr_ini = c.getBoundingClientRect().top; /* top edge of current item */

							c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
						}
					);
				}

				grid.mod = 0;
			}
		});
	};

	const calcGrid = async (_masonryArr: any[]) => {
		await tick();
		if (_masonryArr.length && getComputedStyle(_masonryArr[0]).gridTemplateRows !== 'masonry') {
			grids = _masonryArr.map((grid) => {
				return {
					_el: grid,
					gap: parseFloat(getComputedStyle(grid).gridRowGap),
					items: [...grid.childNodes].filter(
						(c) => c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1
					),
					ncol: 0,
					mod: 0
				};
			});

			refreshLayout(); /* initial load */
		}
	};

	onMount(() => {
		_window = window;
		_window.addEventListener('resize', refreshLayout, false); /* on resize */
	});

	onDestroy(() => {
		if (_window) {
			_window.removeEventListener('resize', refreshLayout, false); /* on resize */
		}
	});

	$: if (masonryElement) {
		// calcGrid([masonryElement]);
		setTimeout(calcGrid, 500, [masonryElement]);
	}

	$: if (items) {
		// update if items are changed
		masonryElement = masonryElement; // refresh masonryElement
	}
</script>

<div
	bind:this={masonryElement}
	class={`__grid--masonry ${stretchFirst ? '__stretch-first' : ''}`}
	style={`--grid-gap: ${gridGap}; --col-width: ${colWidth};`}
>
	<slot />
</div>

<style>
	:global(.__grid--masonry) {
		display: grid;
		grid-template-columns: repeat(auto-fit, var(--col-width));
		grid-template-rows: masonry;
		justify-content: center;
		grid-gap: var(--grid-gap);
	}

	:global(.__grid--masonry > *) {
		align-self: start;
		transition: margin-top 0.2s ease-in-out;
	}

	:global(.__grid--masonry.__stretch-first > *:first-child) {
		grid-column: 1/ -1;
	}
</style>
