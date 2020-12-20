import { markdownRenderer } from "inkdrop";
import wiki_link from "./remark_wiki";
import WikiLink from "./wiki_link";

module.exports = {
    activate() {
        if (markdownRenderer) {
            markdownRenderer.remarkPlugins.push(wiki_link);
            markdownRenderer.remarkReactComponents.wiki_link = WikiLink;
        }
    },

    deactivate() {
        if (markdownRenderer) {
            const { remarkPlugins, remarkReactComponents } = markdownRenderer;
            const i = remarkPlugins.indexOf(wiki_link);
            if (i >= 0) {
                remarkPlugins.splice(i, 1);
            }
            if (remarkReactComponents.wiki_link === WikiLink) {
                delete remarkReactComponents.wiki_link;
            }
        }
    },
};
