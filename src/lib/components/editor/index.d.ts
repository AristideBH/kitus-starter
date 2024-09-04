
import type { Collections } from "$lib/types/client";
type TipTapEditor = {
    type: string | 'doc';
    content: TipTapNode[];
};
type ContentArray = (TipTapNode | Collections.Button | Collections.Gallery | Collections.Image | Collections.Quote | Collections.Section | Collections.Stack | Collections.Video)[];

type TipTapNodeType = 'doc' | 'paragraph' | 'heading' | 'bulletList' | 'orderedList' | 'listItem' | 'taskList' | 'taskItem' | 'blockquote' | 'horizontalRule' | 'codeBlock' | 'quote' | 'image' | 'gallery' | 'section' | 'stack' | 'button' | 'relation-block' | 'text' | 'hardBreak' | 'video';

interface BaseNode {
    type: TipTapNodeType;
    marks: Mark[];
    text: ?string;
    content: TipTapNode[];
    attrs?: CustomAttrs & Attrs;
    editor: TipTapEditor;
}

type Attrs = {
    checked?: boolean;
    level?: '1' | '2' | '3' | '4' | '5' | '6';
    textAlign?: "center" | "left" | "right" | 'justify'
}

type TipTapNode = BaseNode & CustomElementNode;

type CustomElementNode = {
    [K in keyof Collections]: K extends 'Quote' | 'Image' | 'Gallery' | 'Section' | 'Stack' | 'Button' | 'Video'
    ? Collections[K] & { type: Lowercase<K> }
    : never;
}[keyof Collections] | { attrs: CustomAttrs; type: 'relation-block' } | { type: Exclude<TipTapNodeType, 'quote' | 'image' | 'gallery' | 'button' | 'relation-block' | 'video'> };

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

export { TipTapEditor, TipTapNode, CustomAttrs, Attrs, LinkMark, GenericMark, EditorNodesCollections, Mark, ProcessedContent }
