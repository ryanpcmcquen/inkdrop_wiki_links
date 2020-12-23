import { markdownRenderer } from "inkdrop";
import createRemarkWikiLink from "./wiki_link";
import wikiLinkPlugin from "./wiki_link_plugin";

// inkdrop.commands.add(document.body, {
//     "wiki_link:open_or_create": (event, ...args) => {
//         debugger;
//         console.log(event, args);
//         console.log("hey!");
//         inkdrop.commands.dispatch(document.body, "core:search-notes", {
//             keyword: `title:${event}`,
//         });
//         console.log(
//             inkdrop.commands.dispatch(document.body, "core:open-first-note")
//         );
//     },
// });

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
