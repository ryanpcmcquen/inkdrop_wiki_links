import { markdownRenderer } from "inkdrop";
import createRemarkWikiLink from "./wiki_link";
import wikiLinkPlugin from "./wiki_link_plugin";
import { Textcomplete } from "@textcomplete/core";
import  { CodeMirrorEditor } from "@textcomplete/codemirror";
import {strategy,option} from "./wiki_completions";

module.exports = {
    originalSpanComponent: null,
    setWikiLinkComponent() {
        const OriginalSpan = markdownRenderer.remarkReactComponents.span;
        const WikiLink = createRemarkWikiLink(OriginalSpan);
        markdownRenderer.remarkReactComponents.span = WikiLink;
        this.originalSpanComponent = OriginalSpan;
    },

    unsetWikiLinkComponent() {
        markdownRenderer.remarkReactComponents.span = this.originalSpanComponent;
    },
    activate() {
        if (markdownRenderer) {
            markdownRenderer.remarkPlugins.push(wikiLinkPlugin);
            if (!inkdrop.isMobile) {
                this.setWikiLinkComponent();
            }
        }
        const editoHandler = this.handleEditorDidLoad(this);
        global.inkdrop.onEditorLoad(editoHandler.bind(this));
    },

    deactivate() {
        if (markdownRenderer) {
            markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
                (plugin) => plugin !== wikiLinkPlugin
            );
            if (!inkdrop.isMobile) {
                this.unsetWikiLinkComponent();
            }
        }
    },
    handleEditorDidLoad(editor){
        const {cm} = editor;
//const cm = CodeMirror(document.getElementById('editor'))
const cmEditor = new CodeMirrorEditor(cm)
const textcomplete = new Textcomplete(cmEditor, [strategy], option)
    }
};
