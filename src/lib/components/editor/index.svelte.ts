// - Types
import type { Mark, LinkMark, GenericMark, CustomAttrs, EditorNodesCollections, ProcessedContent, TipTapEditor, TipTapNode, Attrs } from './index.d';
import type { DirectusClient } from '$lib/logic/directus';
import type { Collections } from '$lib/types/client';
import { readItem } from '@directus/sdk';

// - COMPONENTS
import BulletList from './components/BulletList.svelte';
import Heading from './components/Heading.svelte';
import Paragraph from './components/Paragraph.svelte';
import OrderedList from './components/OrderedList.svelte';
import Blockquote from './components/Blockquote.svelte';
import TaskList from './components/TaskList.svelte';
import Quote from './components/Quote.svelte';
import Gallery from './components/Gallery.svelte';
import Image from './components/Image.svelte';
import AnimatedHeading from './components/AnimatedHeading.svelte';
import Stack from './components/Stack.svelte';
import Video from './components/Video.svelte';
import Button from './components/Button.svelte';

// - FUNCTIONS
/**
 * Queries the Directus API to retrieve data for various content types based on the provided custom attributes.
 *
 * @param client - The Directus client instance to use for the API requests.
 * @param attrs - The custom attributes object containing information about the content to retrieve.
 * @returns The requested content data, or throws an error if the content type is invalid or the API request fails.
 */
const elementQuery = async (client: DirectusClient, attrs: CustomAttrs | undefined) => {
    if (!attrs) throw new Error('Attributes are undefined');
    try {
        const { id, collection, junction } = attrs;
        const rel = await client.request(readItem(junction as EditorNodesCollections, id));

        if (!rel.item || typeof rel.item != 'string') return;

        switch (collection) {
            case 'quote':
                return (await client.request(readItem('quote', rel.item))) as Collections.Quote;

            case 'image':
                return (await client.request(
                    readItem('image', rel.item, { fields: ['*', { image: ['*'] }] })
                )) as Collections.Image;
            case 'video':
                return (await client.request(
                    readItem('video', rel.item, { fields: ['*'] })
                )) as Collections.Video;

            case 'gallery':
                return (await client.request(
                    readItem('gallery', rel.item, { fields: ['*', { images: ['*'] }] })
                )) as Collections.Gallery;

            case 'button':
                return (await client.request(
                    readItem('button', rel.item, { fields: ['*', { page: ['permalink'] }] })
                )) as Collections.Button;

            case 'stack':
                return (await client.request(
                    readItem('stack', rel.item, { fields: ['*'] })
                )) as Collections.Stack;

            case 'section':
                return (await client.request(
                    readItem('section', rel.item, { fields: ['*'] })
                )) as Collections.Section;

            default:
                throw new Error('Invalid collection type');
        }
    } catch (error) {
        console.error('Someting wrong happened querying the data:', error);
        throw error;
    }
};

/**
 * Adapts the provided `ProcessedContent` array to an array of `TipTapNode` objects.
 * This function is responsible for transforming the data from the API response into a format
 * that can be used by the Tiptap editor.
 *
 * @param content - An array of `ProcessedContent` objects to be adapted.
 * @returns An array of `TipTapNode` objects representing the adapted content.
 */
const adaptToTipTapNodes = (content: ProcessedContent[]): TipTapNode[] => {
    return content.map((item) => {
        if (item.type === 'quote') {
            return {
                ...item,
                marks: [],
                content: [],
                attrs: {},
                editor: {} as TipTapEditor
                // Add any other required properties
            };
        }
        // Handle other content types as needed
        return item as TipTapNode;
    });
}

/**
 * Recursively processes the content of a Tiptap editor, handling relation blocks and processing their content.
 *
 * @param content - An array of `TipTapNode` objects representing the content to be processed.
 * @param directus - A `DirectusClient` instance used to fetch data for relation blocks.
 * @returns A Promise that resolves to an array of `ProcessedContent` objects representing the processed content.
 */
const processContent = async (content: TipTapNode[], directus: DirectusClient): Promise<ProcessedContent[]> => {
    return Promise.all(content.map(async (item: TipTapNode) => {
        if (item.type === "relation-block") {
            const data = await elementQuery(directus, item.attrs);
            if (data && 'editor' in data && Array.isArray(data.editor.content)) {
                data.editor.content = await processContent(data.editor.content, directus);
            }
            return data as ProcessedContent;
        }
        return item;
    }));
}


// - Logic
class LoadingState {
    state: 'loading' | 'ready' = $state('loading');
    ready() {
        this.state = 'ready';
    }
    loading() {
        this.state = 'loading';
    }
}

/**
 * Finds the first mark in the provided array that matches the specified type.
 *
 * @param marks - An array of `Mark` objects to search.
 * @param type - The type of mark to search for.
 * @returns The first mark of the specified type, or `null` if no such mark is found.
 */
const findMark = <T extends Mark>(marks: Mark[], type: string): T | null => {
    return marks.find((mark) => mark.type === type) as T | null;
};
const findLink = (marks: Mark[]): LinkMark | null => findMark<LinkMark>(marks, 'link');
const findCode = (marks: Mark[]): GenericMark | null => findMark<GenericMark>(marks, 'code');
const findSub = (marks: Mark[]): GenericMark | null => findMark<GenericMark>(marks, 'subscript');
const findSup = (marks: Mark[]): GenericMark | null => findMark<GenericMark>(marks, 'superscript');



// - Layout
/**
 * Generates a string of CSS class names based on the provided marks.
 *
 * @param marks - An array of `Mark` objects representing the formatting marks applied to the text.
 * @returns A string of CSS class names that can be applied to the text to reflect the formatting.
 */

const setMarks = (marks: Mark[]) => {
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


const setTextAlign = (attrs: Attrs | undefined) => {
    if (!attrs) {
        return '';
    }
    if (attrs?.textAlign) {
        return `text-${attrs.textAlign}`;
    }
    return '';
};


export {
    LoadingState, setMarks, findCode, findLink, findSub, findSup, adaptToTipTapNodes, processContent, setTextAlign,
    BulletList, Heading, Paragraph, OrderedList, Blockquote, TaskList, Button,
    Quote, Gallery, Image, AnimatedHeading, Stack, Video,
}