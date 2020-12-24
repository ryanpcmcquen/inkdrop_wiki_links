import { markdownRenderer } from "inkdrop";
import createRemarkWikiLink from "./wiki_link";
import wikiLinkPlugin from "./wiki_link_plugin";

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
            // markdownRenderer.remarkReactComponents.wikiLink = WikiLink;
            // Array.from(document.querySelectorAll(".wiki_link")).forEach(
            //     (wiki_link_node) => {
            //         wiki_link_node.addEventListener("click", (event) => {
            //             console.log(event);
            //             console.log(event.target.textContent);
            //         });
            //     }
            // );
            debugger;
            if (!inkdrop.isMobile) {
                this.setWikiLinkComponent();
            }
        }
    },

    deactivate() {
        if (markdownRenderer) {
            markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
                (plugin) => plugin !== wikiLinkPlugin
            );
            // if (remarkReactComponents.wikiLink === WikiLink) {
            // delete remarkReactComponents.wikiLink;
            // }
            if (!inkdrop.isMobile) {
                this.unsetWikiLinkComponent();
            }
        }
    },
};
