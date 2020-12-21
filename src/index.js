import { markdownRenderer } from "inkdrop";
// import wiki_link from "./remark_wiki";
// import WikiLink from "./wiki_link";
import wikiLinkPlugin from "remark-wiki-link";

module.exports = {
    activate() {
        debugger;
        console.log(wikiLinkPlugin);
        if (markdownRenderer) {
            // markdownRenderer.remarkPlugins.push(wiki_link);
            markdownRenderer.remarkPlugins.push(wikiLinkPlugin);
            // markdownRenderer.remarkReactComponents.wiki_link = WikiLink;
        }
    },

    deactivate() {
        if (markdownRenderer) {
            // const { remarkPlugins, remarkReactComponents } = markdownRenderer;
            const { remarkPlugins } = markdownRenderer;
            // const i = remarkPlugins.indexOf(wiki_link);
            const i = remarkPlugins.indexOf(wikiLinkPlugin);
            if (i >= 0) {
                remarkPlugins.splice(i, 1);
            }
            // if (remarkReactComponents.wiki_link === WikiLink) {
            //     delete remarkReactComponents.wiki_link;
            // }
        }
    },
};
