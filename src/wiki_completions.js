
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// How to construct the editor object depends on the actual editor class. 
// Please read the document of the editor you choose. 


// When you finish using it. 
// This command also destroys the editor object. 
//textcomplete.destroy()

// This is a sample strategy that autocompletes GitHub-style emoji notation.
// This document page is using almost the same strategy for demo.
import {LINK_REGEX} from  './wiki_link_plugin'
//the actual result of search
export const gatherCandidates = (term) => ["1", "2", "3", "4", "5"]
export const strategy = {
    // (Optional) Identifier of the strategy. Will be appear on data-strategy
    // attribute of a dropdown element.
    id: "mention",
    // (Optional) This function is called on every change before matching. The
    // first argument is the string from head to cursor. If it returns `false`,
    // following matching phase isn't started.
    context: (beforeCursor) =>
        // Return false if the cursor is in code block or inline code notation
        // to stop executing the matching phase.
        true,
    // !isInClode(beforeCursor),
    // (Required) On every change, the string from head to cursor tests with the
    // RegExp. If it matches, the captured substring will be passed to the search
    // parameter's first argument.
    // See also "index" parameter.
    match: /\B\[\[(.+?)/,
         // ///\B:([\-+\w]*)$/,
    // (Optional) Specify the index of target capture group. Default to 1.
    index: 1,
    // (Required) When the current input matches the "match" regexp above, this
    // function is called. The first argument is the captured substring.
    // You can callback only once for each search.
    search: async (
        term,
        callback,
        match //: RegExpMatchArray
    ) => {
        callback(await gatherCandidates(term))
    },
    // (Optional) Whether the search results are cached. Default false.
    cache: false,
    // (Optional) Specify how to render each search result on the dropdown UI.
    // The argument is an element of the search results callbacked in the search
    // phase.
    //template: ([key, url]) =>
    //`<img src="${url}"/>&nbsp;<small>${key}</small>`,
    // (Required) Specify how to update the editor value. The whole substring
    // matched in the match phase will be replaced by the returned value.
    // Note that it can return a string or an array of two strings. If it returns
    // an array, the matched substring will be replaced by the concatenated string
    // and the cursor will be set between first and second strings.
    replace: (result /*: ResultType): string*/) => `:${result[0]}: `
}
export const  option = {
    // Configure a dropdown UI. 
    dropdown: {
        // Class attribute of the dropdown element.
        className: "dropdown-menu textcomplete-dropdown",
        // The maximum number of items to be rendered.
        maxCount: 10,
        // Placement of the dropdown. "auto", "top" or "bottom".
      //  placement: "auto",
        // Return header and footer elements' content
        header: (results) => "",
        footer: (results) => "",
        // Whether activate the opposite side item on pressing up or
        // down key when an edge item is active.
        rotate: false,
        // Configure CSS style of the dropdown element.
       // style: { display: "none", position: "absolute", zIndex: "1000" },
        // The parent node of the dropdown element.
        parent: document.body,

        item: {
            // Class attribute of the each dropdown item element.
            className: "textcomplete-item",
            // Active item's class attribute.
            activeClassName: "textcomplete-item active",
        }
    }
}