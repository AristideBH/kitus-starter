<script lang="ts">
	import AnimatedHeading from '$lib/components/editor/components/AnimatedHeading.svelte';
	import Image from '$lib/components/image/Image.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ChevronRight } from 'lucide-svelte';

	// import Seo from '@archangelgca/sk-seo';

	let { data } = $props();
	let { home } = data;
</script>

<!-- <Seo title={home!.seo_detail?.meta_title!} description={home!.seo_detail?.meta_description!} /> -->

<Section content={{ width: 'full-width', color: 'none' }}>
	<Image item={home?.img!} class="max-h-96" loading="eager" />
</Section>

<Section>
	<AnimatedHeading class="mb-0 ~text-6xl/9xl">Kitus Starter</AnimatedHeading>
	<p class="lead mb-10 italic text-primary">A custom starter template for Sveltekit & Directus</p>

	<Accordion.Root type="single" class="rounded-sm bg-muted" value={'item-1'}>
		<Accordion.Item value="item-1" class="mx-6 rounded-sm">
			<Accordion.Trigger class="!no-underline">Details</Accordion.Trigger>
			<Accordion.Content>
				<ul class="ms-0 border-t border-secondary pt-4 text-base">
					<li>Svelte 5 & Sveltekit</li>
					<li>Directus SDK and decicated functions</li>
					<li>Client Types & Schema sync</li>
					<li>Authentification & account page</li>
					<li>Sitemap.xml generation</li>
					<li>Tailwind, shadcn-svelte and fluid plugin</li>
					<li>Pages transitions & animated sections</li>
					<li>
						Components :
						<ul>
							<li>Image</li>
							<li>Pagination</li>
							<li>Flexible Builder</li>
						</ul>
					</li>
				</ul>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<div class="mt-4 flex gap-2">
		<Button variant="secondary" href="/work">Work<ChevronRight class="ms-2 size-4" /></Button>
		<Button variant="border" href="/work/services">
			Services
			<ChevronRight class="ms-2 size-4" />
		</Button>
	</div>
</Section>
