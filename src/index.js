import { markdownRenderer } from "inkdrop";
// import wiki_link from "./remark_wiki";
import createRemarkWikiLink from "./wiki_link";
import wikiLinkPlugin from "./wiki_link_plugin";

// wikiLinkPlugin.hrefTemplate = (permalink) => `command://core:find/${permalink}`;

module.exports = {
    origAComponent: null,
    activate() {
        // debugger;
        // console.log(wikiLinkPlugin);
        if (markdownRenderer) {
            // markdownRenderer.remarkPlugins.push(wiki_link);
            markdownRenderer.remarkPlugins.push(wikiLinkPlugin);
            // markdownRenderer.remarkReactComponents.wiki_link = WikiLink;
            !inkdrop.isMobile && this.setWikiLinkComponent();
        }
    },

    deactivate() {
        if (markdownRenderer) {
            // const { remarkPlugins, remarkReactComponents } = markdownRenderer;
            // const { remarkPlugins } = markdownRenderer;
            // const i = remarkPlugins.indexOf(wiki_link);
            // const i = remarkPlugins.indexOf(wikiLinkPlugin);
            // if (i >= 0) {
            // remarkPlugins.splice(i, 1);
            // }
            markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
                (plugin) => plugin !== WikiLink
            );
            !inkdrop.isMobile && this.unsetWikiLinkComponent();
            // if (remarkReactComponents.wiki_link === WikiLink) {
            //     delete remarkReactComponents.wiki_link;
            // }
        }
    },
    setWikiLinkComponent() {
        const OrigA = markdownRenderer.remarkReactComponents.a;
        const WikiLink = createRemarkWikiLink(OrigA);
        markdownRenderer.remarkReactComponents.a = WikiLink;
        this.origAComponent = OrigA;
    },

    unsetWikiLinkComponent() {
        markdownRenderer.remarkReactComponents.a = this.origAComponent;
    },
};
