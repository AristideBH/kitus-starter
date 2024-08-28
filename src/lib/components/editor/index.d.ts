type TipTapEditor = {
    type: string | 'doc';
    content: TipTapNode[];
};

type TipTapNode = {
    type: string;
    marks: Mark[];
    text?: string;
    content: TipTapNode[];
    attrs: CustomAttrs & {
        checked?: boolean,
        level: '1' | '2' | '3' | '4' | '5',
    } | undefined
};

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

export { TipTapEditor, TipTapNode, CustomAttrs, LinkMark, GenericMark, EditorNodesCollections, Mark }  