"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.option = exports.strategy = exports.gatherCandidates = void 0;

var _inkdrop, _inkdrop$main, _inkdrop$main$dataSto, _inkdrop2, _inkdrop2$codeMirror;

/*eslint no-debugger: false*/
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
//@ts-ignore
const db = inkdrop && ((_inkdrop = inkdrop) === null || _inkdrop === void 0 ? void 0 : (_inkdrop$main = _inkdrop.main) === null || _inkdrop$main === void 0 ? void 0 : (_inkdrop$main$dataSto = _inkdrop$main.dataStore) === null || _inkdrop$main$dataSto === void 0 ? void 0 : _inkdrop$main$dataSto.getLocalDB()); //the actual result of search
//@ts-ignore

const cursor = inkdrop && ((_inkdrop2 = inkdrop) === null || _inkdrop2 === void 0 ? void 0 : (_inkdrop2$codeMirror = _inkdrop2.codeMirror) === null || _inkdrop2$codeMirror === void 0 ? void 0 : _inkdrop2$codeMirror.getCursor()); //experimental
// const cmParentElement = document.querySelector(
//     "#app-container > div.main-layout.main-layout-slim > div.editor-layout > div.mde-layout > div > div.mde > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code"
// );

const gatherCandidates = async term => {
  const note = await db.utils.search(`title:${term}`);

  if (note !== null && note !== void 0 && note.docs && note.docs.length > 0) {
    return note.docs.map(doc => doc.title);
  } else {
    return [""];
  }
};

exports.gatherCandidates = gatherCandidates;
const strategy = {
  // (Optional) Identifier of the strategy. Will be appear on data-strategy
  // attribute of a dropdown element.
  id: "mention",
  // (Optional) This function is called on every change before matching. The
  // first argument is the string from head to cursor. If it returns `false`,
  // following matching phase isn't started.
  context: beforeCursor => {
    // Return false if the cursor is in code block or inline code notation
    // to stop executing the matching phase.

    /*
    if (beforeCursor.indexOf("[") > -1) {
        const reversedCursor = beforeCursor.split("").reverse();
         if (
            reversedCursor.indexOf("[") < reversedCursor.indexOf("]") ||
            reversedCursor.indexOf("]") < 0
        ) {
            return true;
        }
    }
    */
    return true;
  },
  // !isInClode(beforeCursor),
  // (Required) On every change, the string from head to cursor tests with the
  // RegExp. If it matches, the captured substring will be passed to the search
  // parameter's first argument.
  // See also "index" parameter.
  // match: /\B\[\[(.+?)/,
  // match: /\B\[\[([^\]]+)/gm,
  match: /\[\[([^\]]+)(?=$)/,
  // ///\B:([\-+\w]*)$/,
  // (Optional) Specify the index of target capture group. Default to 1.
  index: 1,
  // (Required) When the current input matches the "match" regexp above, this
  // function is called. The first argument is the captured substring.
  // You can callback only once for each search.
  search: async (term, callback, match) => {
    callback(await gatherCandidates(term));
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
  replace: result => {
    return `[[${result}]]`;
  }
};
exports.strategy = strategy;
const option = {
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
    parent: document.body,
    //.querySelector("#app-container > div.main-layout.main-layout-slim > div.editor-layout > div.mde-layout > div > div.mde > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code"),
    // Configure CSS style of the dropdown element.
    // style: { display: "none", position: "absolute", zIndex: "1000" },
    // The parent node of the dropdown element.
    // parent: document.body,
    item: {
      // Class attribute of the each dropdown item element.
      className: "textcomplete-item",
      // Active item's class attribute.
      activeClassName: "textcomplete-item active"
    }
  }
};
exports.option = option;
//# sourceMappingURL=wiki_completions.js.map