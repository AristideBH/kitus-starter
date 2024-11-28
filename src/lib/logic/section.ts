import type { Collections } from "$lib/types/client";
import type { Snippet } from "svelte";

type UnitValue = `${number}px` | `${number}em` | `${number}rem` | `${number}%`;

type InViewParams = {
    trigger?: Partial<{ start: UnitValue; end: UnitValue }>;
    distance?: UnitValue;
};

export type SectionProps = {
    tag?: 'section' | 'header' | 'footer';
    viewTimeline?: InViewParams;
    once?: boolean;
    rootMargin?: UnitValue;
    class?: string;
    children: Snippet;
    content?: Partial<Collections.Section>
};

// ViewTimeline
export const inViewDefaults: InViewParams = {
    distance: '2.5rem',
    trigger: { start: '12.5rem', end: '10rem' }
};

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

export const inView = (node: HTMLElement, params: Partial<InViewParams> = inViewDefaults) => {
    if (!('ViewTimeline' in window)) {
        return;
    }
    // @ts-expect-error ViewTimeline is still not very supported
    const timeline = new ViewTimeline({
        subject: node,
        axis: 'block'
    });

    const { distance, trigger } = {
        ...inViewDefaults,
        ...params
    };

    node.animate(translate(distance!).in, {
        fill: 'forwards',
        timeline,
        // @ts-expect-error Rangestart not yet typed in
        rangeStart: 'entry 0%',
        rangeEnd: `cover ${trigger?.start}`,
    });

    node.animate(translate(distance!).out, {
        fill: 'forwards',
        timeline,
        // @ts-expect-error Rangestart not yet typed in
        rangeStart: `cover calc(100% - ${trigger?.end})`,
        rangeEnd: 'exit 100%'
    });
};
