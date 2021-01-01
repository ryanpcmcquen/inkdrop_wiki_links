import { markdownRenderer } from "inkdrop";
import createRemarkWikiLink from "./wiki_link";
import wikiLinkPlugin from "./wiki_link_plugin";
import { Textcomplete } from "@textcomplete/core";
import { CodeMirrorEditor } from "@textcomplete/codemirror";
import { strategy, option } from "./wiki_completions";
import CodeMirror from "codemirror";

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
        global.inkdrop.onEditorLoad((editor) =>
            this.handleEditorDidLoad(editor)
        );
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
    /** @param {CodeMirror.Editor} editor  **/
    handleEditorDidLoad(editor) {
        const { cm } = editor;
        //const cm = CodeMirror(document.getElementById('editor'))

        //cm.on(document.body,"beforeChange", (e)=>{e.preventDefault(); e.stopPropagation(); CodeMirror.Pass});
        const cmEditor = new CodeMirrorEditor(codeMirror);
        const textcomplete = new Textcomplete(cmEditor, [strategy], option);
    },
};
