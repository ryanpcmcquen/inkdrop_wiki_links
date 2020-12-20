"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function locator(value, fromIndex) {
  return value.indexOf("$", fromIndex);
} // https://regex101.com/r/Tsi5wM/1


const RE_WIKI = /\[{2}([^\]]+)\]{2}?/gm; // const db = inkdrop.main.dataStore.getLocalDB();
// const utils = db.utils;

function tokenizer(eat, value, silent) {
  const match = RE_WIKI.exec(value);

  if (match) {
    if (silent) {
      return true;
    } // debugger;


    const result = eat(match[0])({
      type: "linkReference",
      value: match[1].trim()
    });
    debugger;
    return result;
  }
}

tokenizer.locator = locator;
tokenizer.notInLink = false;
var _default = tokenizer;
exports.default = _default;