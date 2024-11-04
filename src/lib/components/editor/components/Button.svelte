<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { ButtonVariant, ButtonSize } from '$lib/components/ui/button';

	import type { Collections } from '$lib/types/client';
	type Props = { content: Collections.Button };

	let { content }: Props = $props();

	let { label, variant, size, link, url, page, new_tab } = content;
	const href = () => {
		if (link === 'page' && typeof page != 'string') {
			return `/${page?.permalink}`;
		}
		return url;
	};
</script>

<Button
	variant={variant as ButtonVariant}
	size={size as ButtonSize}
	href={href()}
	target={new_tab && link === 'url' ? '_blank' : ''}
	class="w-fit"
>
	{label}
</Button>
