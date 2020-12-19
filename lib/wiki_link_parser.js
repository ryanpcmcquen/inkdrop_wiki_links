"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function locator(value, fromIndex) {
  return value.indexOf("$", fromIndex);
}

const RE_WIKI = /\[{2}[^\]]+\]{2}/;

function tokenizer(eat, value, silent) {
  const match = RE_WIKI.exec(value);

  if (match) {
    if (silent) {
      return true;
    }

    debugger;
    return eat(match[0])({
      type: "inlineCode",
      value: match[1].trim()
    });
  }
}

tokenizer.locator = locator;
tokenizer.notInLink = true;
var _default = tokenizer;
exports.default = _default;
//# sourceMappingURL=wiki_link_parser.js.map