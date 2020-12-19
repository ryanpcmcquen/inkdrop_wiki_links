"use babel";

import WikiLinksMessageDialog from "./wiki_links_message_dialog";

module.exports = {
    activate() {
        inkdrop.components.registerClass(WikiLinksMessageDialog);
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
