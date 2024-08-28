
import type { Collections } from "$lib/types/client";
type TipTapEditor = {
    type: string | 'doc';
    content: TipTapNode[];
};

type ProcessedContent = TipTapNode | (Collections.Button | Collections.Gallery | Collections.Image | Collections.Quote | Collections.Section | Collections.Stack);

type TipTapNodeType =
    | 'doc'
    | 'paragraph'
    | 'heading'
    | 'bulletList'
    | 'orderedList'
    | 'listItem'
    | 'blockquote'
    | 'horizontalRule'
    | 'codeBlock'
    | 'quote'
    | 'image'
    | 'gallery'
    | 'section'
    | 'stack'
    | 'button'
    | 'relation-block'
    | 'text'
    | 'hardBreak';

type TipTapNode = {
    type: TipTapNodeType;
    marks: Mark[];
    text?: string;
    content: (TipTapNode)[];
    attrs: CustomAttrs & {
        checked?: boolean,
        level: '1' | '2' | '3' | '4' | '5',
    } | undefined
    editor: TipTapEditor
} & CustomElementNode;

type CustomElementNode =
    | (Collections.Quote & { type: 'quote' })
    | (Collections.Image & { type: 'image' })
    | (Collections.Gallery & { type: 'gallery' })
    | (Collections.Section & { type: 'section' })
    | (Collections.Stack & { type: 'stack' })
    | (Collections.Button & { type: 'button' })
    | ({ attrs: CustomAttrs } & { type: 'relation-block' })
    | { type: Exclude<TipTapNodeType, 'quote' | 'image' | 'gallery' | 'section' | 'stack' | 'button' | 'relation-block'> };

type CustomAttrs = {
    id: string,
    junction: string,
    collection: string,
};


// Marks
type LinkMark = {
    type: 'link';
    attrs: {
        rel: 'noopener noreferrer nofollow' | 'footnote',
        href: string,
        class: string,
        target: string
    }
}

type GenericMark = {
    type: 'link' | 'italic' | 'bold' | 'strike' | "code" | "subscript" | "superscript"
}

type Mark = LinkMark | GenericMark;

type EditorNodesCollections = 'pages_editor_nodes' | 'section_editor_nodes';

export { TipTapEditor, TipTapNode, CustomAttrs, LinkMark, GenericMark, EditorNodesCollections, Mark, ProcessedContent }  