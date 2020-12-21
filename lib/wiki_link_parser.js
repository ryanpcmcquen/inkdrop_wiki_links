"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function locator(value, fromIndex) {
  return value.indexOf("[", fromIndex);
} // https://regex101.com/r/Tsi5wM/1
// Works:


const RE_WIKI = /\[([^\]]+)\]{2}/gm; // https://regex101.com/r/Tsi5wM/2
// Breaks:
// This regex is too global, upstream issue:
// https://github.com/remarkjs/remark/issues/585
// const RE_WIKI = /\[([^\[\]]+)\]{2}/gm;

function tokenizer(eat, value, silent) {
  const match = RE_WIKI.exec(value);

  if (match) {
    if (silent || match.length < 1) {
      return true;
    } // debugger;


    const linkText = match[1].trim(); //.replace("[", "");

    const result = eat(match[0])({
      type: "wiki_link",
      // value: `[${linkText}]]`,
      value: linkText // hChildren: [{ type: "text", value: linkText }],

    });
    return result;
  }
}

tokenizer.locator = locator;
tokenizer.notInLink = false;
var _default = tokenizer;
exports.default = _default;