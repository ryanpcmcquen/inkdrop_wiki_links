"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function locator(value, fromIndex) {
  return value.indexOf("[", fromIndex);
} // https://regex101.com/r/Tsi5wM/1


const RE_WIKI = /(\[{2}([^\]]+)\]{2})?/gm;

function tokenizer(eat, value, silent) {
  const match = RE_WIKI.exec(value);

  if (match) {
    if (silent || match.length < 1) {
      return true;
    }

    debugger;

    if (!match[1]) {
      return true;
    }

    const result = eat(match[0])({
      type: "linkReference",
      value: match[1].trim()
    }); // debugger;

    return result;
  }
}

tokenizer.locator = locator;
tokenizer.notInLink = true;
var _default = tokenizer;
exports.default = _default;