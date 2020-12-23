import { markdownRenderer } from "inkdrop";
import createRemarkWikiLink from "./wiki_link";
import wikiLinkPlugin from "./wiki_link_plugin";

// wikiLinkPlugin.hrefTemplate = (permalink) => `command://core:find/${permalink}`;

module.exports = {
    originalAnchorComponent: null,
    activate() {
        if (markdownRenderer) {
            markdownRenderer.remarkPlugins.push(wikiLinkPlugin);
            if (!inkdrop.isMobile) {
                this.setWikiLinkComponent();
            }
        }
    },

    deactivate() {
        if (markdownRenderer) {
            markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
                (plugin) => plugin !== WikiLink
            );
            if (!inkdrop.isMobile) {
                this.unsetWikiLinkComponent();
            }
        }
    },
    setWikiLinkComponent() {
        const OriginalAnchor = markdownRenderer.remarkReactComponents.a;
        const WikiLink = createRemarkWikiLink(OriginalAnchor);
        markdownRenderer.remarkReactComponents.a = WikiLink;
        this.originalAnchorComponent = OriginalAnchor;
    },

    unsetWikiLinkComponent() {
        markdownRenderer.remarkReactComponents.a = this.originalAnchorComponent;
    },
};
