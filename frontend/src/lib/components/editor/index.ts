// - Types
import type { Mark, LinkMark, GenericMark, CustomAttrs, EditorNodesCollections } from './index.d';
import { readItem } from '@directus/sdk';
import type { DirectusClient } from '$lib/logic/directus';
import type { Collections } from '$lib/types/client';

// - COMPONENTS
// Defaults
import BulletList from './defaults/BulletList.svelte';
import Heading from './defaults/Heading.svelte';
import Paragraph from './defaults/Paragraph.svelte';
import OrderedList from './defaults/OrderedList.svelte';
import Blockquote from './defaults/Blockquote.svelte';
import TaskList from './defaults/TaskList.svelte';
// Custom
import Quote from './custom/Quote.svelte';
import Gallery from './custom/Gallery.svelte';
import Image from './custom/Image.svelte';

export {
    BulletList, Heading, Paragraph, OrderedList, Blockquote, TaskList,
    Quote, Gallery, Image
}

// - FUNCTIONS
export const elementQuery = async (client: DirectusClient, attrs: CustomAttrs | undefined) => {
    if (!attrs) throw new Error('Attributes are undefined');
    try {
        const { id, collection, junction } = attrs;
        const rel = await client.request(readItem(junction as EditorNodesCollections, id));

        if (!rel.item || typeof rel.item != 'string') return;

        if (collection === 'quote') {
            return (await client.request(readItem('quote', rel.item))) as Collections.Quote;
        } else if (collection === 'image') {
            return (await client.request(
                readItem('image', rel.item, { fields: ['*', { image: ['*'] }] })
            )) as Collections.Image;
        } else if (collection === 'gallery') {
            return (await client.request(
                readItem('gallery', rel.item, { fields: ['*', { images: ['*'] }] })
            )) as Collections.Gallery;
            // } else if (collection === 'menu_items') {
            // 	return (await client.request(
            // 		readItem('menu_items', rel.item, { fields: ['*.*'] })
            // 	)) as Collections.MenuItems;
        } else if (collection === 'section') {
            return (await client.request(
                readItem('section', rel.item, { fields: ['*'] })
            )) as Collections.Section;
        } else {
            throw new Error('Invalid collection type');
        }
    } catch (error) {
        console.error('Someting wrong happened querying the data:', error);
        throw error;
    }
};
// Logic
const findMark = <T extends Mark>(marks: Mark[], type: string): T | null => {
    return marks.find((mark) => mark.type === type) as T | null;
};

export const findLink = (marks: Mark[]): LinkMark | null => {
    return findMark<LinkMark>(marks, 'link');
};

export const findCode = (marks: Mark[]): GenericMark | null => {
    return findMark<GenericMark>(marks, 'code');
};


// Layout
export const setMarks = (marks: Mark[]) => {
    const c: string[] = [];
    marks.forEach((mark) => {
        const { type } = mark;
        if (type === 'bold') {
            c.push(`font-${type}`);
        } else if (type === 'italic') {
            c.push(type);
        } else if (type === 'strike') {
            c.push('line-through');
        }
    });

    return c.join(' ');
};
