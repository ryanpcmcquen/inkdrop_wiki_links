// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { CursorOffset, SearchResult } from "@textcomplete/core";

// How to construct the editor object depends on the actual editor class.
// Please read the document of the editor you choose.

// When you finish using it.
// This command also destroys the editor object.
//textcomplete.destroy()

// This is a sample strategy that autocompletes GitHub-style emoji notation.
// This document page is using almost the same strategy for demo.
//@ts-ignore
const db = inkdrop && inkdrop?.main?.dataStore?.getLocalDB();

//the actual result of search
//@ts-ignore
const cursor = inkdrop && inkdrop?.codeMirror?.getCursor();
//experimental
const cmParentElement = document.querySelector("#app-container > div.main-layout.main-layout-slim > div.editor-layout > div.mde-layout > div > div.mde > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code")

export const gatherCandidates = async (term) => {
    console.log(term);
    const note = await db.utils.search(`title:${term}`);

    if (note?.docs && note.docs.length > 0) {
        return note.docs.map((doc) => doc.title);
    } else {
        return [""];
    }
};
export const strategy = {
    // (Optional) Identifier of the strategy. Will be appear on data-strategy
    // attribute of a dropdown element.
    id: "mention",
    // (Optional) This function is called on every change before matching. The
    // first argument is the string from head to cursor. If it returns `false`,
    // following matching phase isn't started.
    context: (beforeCursor:string) => {
        // Return false if the cursor is in code block or inline code notation
        // to stop executing the matching phase.
        // console.log(beforeCursor.slice(-2));
        // console.log(beforeCursor.slice(-2) === "[[");
        // debugger;
/*
        if (beforeCursor.indexOf("[") > -1) {
            const reversedCursor = beforeCursor.split("").reverse();

            if (
                reversedCursor.indexOf("[") < reversedCursor.indexOf("]") ||
                reversedCursor.indexOf("]") < 0
            ) {
                console.log("true");
                return true;
            }
        }
*/
        //console.log("false");
        
        return true;

    },
    // !isInClode(beforeCursor),
    // (Required) On every change, the string from head to cursor tests with the
    // RegExp. If it matches, the captured substring will be passed to the search
    // parameter's first argument.
    // See also "index" parameter.
    // match: /\B\[\[(.+?)/,
    // match: /\B\[\[([^\]]+)/gm,
    match: /\[\[([\w]+)/m,
    // ///\B:([\-+\w]*)$/,
    // (Optional) Specify the index of target capture group. Default to 1.
    index: 1,
    // (Required) When the current input matches the "match" regexp above, this
    // function is called. The first argument is the captured substring.
    // You can callback only once for each search.
    search: async (
        term :string,
        callback:((results:SearchResult<string>[])=> void),
        match : RegExpMatchArray
    ) => {
        // debugger;
        /*
        console.log("term " + term);
        const groups = match.groups;
        const a = [];
        let matched =groups?.findIndex(element => element === term);
        var searchTerm =(matched && matched === (groups.length - 1))? 
        */
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
    replace: (result /*: ResultType): string*/)  =>{
      console.log(result)
     result} //["[[" + `${result}` + "]]",""],}
};
export const option = {
    // Configure a dropdown UI.
    dropdown: {
        // Class attribute of the dropdown element.
        className: "dropdown-menu textcomplete-dropdown",
        // The maximum number of items to be rendered.
        maxCount: 10,
        // Placement of the dropdown. "auto", "top" or "bottom".
        //  placement: "auto",
        // Return header and footer elements' content
     //   header: (results) => "",
       // footer: (results) => "",
        // Whether activate the opposite side item on pressing up or
        // down key when an edge item is active.
        rotate: false,
        parent: document.body,//.querySelector("#app-container > div.main-layout.main-layout-slim > div.editor-layout > div.mde-layout > div > div.mde > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code"),
        // Configure CSS style of the dropdown element.
        // style: { display: "none", position: "absolute", zIndex: "1000" },
        // The parent node of the dropdown element.
       // parent: document.body,

        item: {
            // Class attribute of the each dropdown item element.
            className: "textcomplete-item",
            // Active item's class attribute.
            activeClassName: "textcomplete-item active",
        },
    },
};
