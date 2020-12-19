"use babel";

import { markdownRenderer } from "inkdrop";
import WikiLinksMessageDialog from "./wiki_links_message_dialog";

module.exports = {
    activate() {
        inkdrop.components.registerClass(WikiLinksMessageDialog);
        if (markdownRenderer) {
            debugger;
        }
        inkdrop.layouts.addComponentToLayout("modal", "WikiLinksMessageDialog");
    },

    deactivate() {
        inkdrop.layouts.removeComponentFromLayout(
            "modal",
            "WikiLinksMessageDialog"
        );
        inkdrop.components.deleteClass(WikiLinksMessageDialog);
    },
};
