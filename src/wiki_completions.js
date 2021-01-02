"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
exports.__esModule = true;
exports.option = exports.strategy = exports.gatherCandidates = void 0;
// How to construct the editor object depends on the actual editor class.
// Please read the document of the editor you choose.
// When you finish using it.
// This command also destroys the editor object.
//textcomplete.destroy()
// This is a sample strategy that autocompletes GitHub-style emoji notation.
// This document page is using almost the same strategy for demo.
//@ts-ignore
var db = inkdrop && ((_b = (_a = inkdrop === null || inkdrop === void 0 ? void 0 : inkdrop.main) === null || _a === void 0 ? void 0 : _a.dataStore) === null || _b === void 0 ? void 0 : _b.getLocalDB());
//the actual result of search
//@ts-ignore
var cursor = inkdrop && ((_c = inkdrop === null || inkdrop === void 0 ? void 0 : inkdrop.codeMirror) === null || _c === void 0 ? void 0 : _c.getCursor());
//experimental
var cmParentElement = document.querySelector("#app-container > div.main-layout.main-layout-slim > div.editor-layout > div.mde-layout > div > div.mde > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code");
var gatherCandidates = function (term) { return __awaiter(void 0, void 0, void 0, function () {
    var note;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(term);
                return [4 /*yield*/, db.utils.search("title:" + term)];
            case 1:
                note = _a.sent();
                if ((note === null || note === void 0 ? void 0 : note.docs) && note.docs.length > 0) {
                    return [2 /*return*/, note.docs.map(function (doc) { return doc.title; })];
                }
                else {
                    return [2 /*return*/, [""]];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.gatherCandidates = gatherCandidates;
exports.strategy = {
    // (Optional) Identifier of the strategy. Will be appear on data-strategy
    // attribute of a dropdown element.
    id: "mention",
    // (Optional) This function is called on every change before matching. The
    // first argument is the string from head to cursor. If it returns `false`,
    // following matching phase isn't started.
    context: function (beforeCursor) {
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
    match: /\B\[\[([\w]+)/gm,
    // ///\B:([\-+\w]*)$/,
    // (Optional) Specify the index of target capture group. Default to 1.
    index: 1,
    // (Required) When the current input matches the "match" regexp above, this
    // function is called. The first argument is the captured substring.
    // You can callback only once for each search.
    search: function (term, callback, match) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // debugger;
                    /*
                    console.log("term " + term);
                    const groups = match.groups;
                    const a = [];
                    let matched =groups?.findIndex(element => element === term);
                    var searchTerm =(matched && matched === (groups.length - 1))?
                    */
                    _a = callback;
                    return [4 /*yield*/, exports.gatherCandidates(term)];
                case 1:
                    // debugger;
                    /*
                    console.log("term " + term);
                    const groups = match.groups;
                    const a = [];
                    let matched =groups?.findIndex(element => element === term);
                    var searchTerm =(matched && matched === (groups.length - 1))?
                    */
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); },
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
    replace: function (result /*: ResultType): string*/) { return ["[[" + result + "]]", "b"]; }
};
exports.option = {
    // Configure a dropdown UI.
    dropdown: {
        // Class attribute of the dropdown element.
        className: "dropdown-menu textcomplete-dropdown",
        // The maximum number of items to be rendered.
        maxCount: 10,
        // Placement of the dropdown. "auto", "top" or "bottom".
        //  placement: "auto",
        // Return header and footer elements' content
        header: function (results) { return ""; },
        footer: function (results) { return ""; },
        // Whether activate the opposite side item on pressing up or
        // down key when an edge item is active.
        rotate: false,
        parent: document.querySelector("#app-container > div.main-layout.main-layout-slim > div.editor-layout > div.mde-layout > div > div.mde > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code"),
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
