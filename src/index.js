import { markdownRenderer } from "inkdrop";
import WikiLink from "./wiki_link";

module.exports = {
    activate() {
        console.log("hello!");
        if (markdownRenderer) {
            debugger;
            markdownRenderer.remarkCodeComponents.wiki = WikiLink;
        }
    },

    deactivate() {
        if (markdownRenderer) {
            const { remarkPlugins, remarkCodeComponents } = markdownRenderer;
            const i = remarkPlugins.indexOf(wiki);
            if (i >= 0) remarkPlugins.splice(i, 1);
            if (remarkCodeComponents.wiki === WikiLink) {
                delete remarkCodeComponents.wiki;
            }
        }
    },
};
