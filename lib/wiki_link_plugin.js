"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINK_REGEX = void 0;

/**
 * @author landakram
 * @copyright 2017 Mark Hudnall
 * @license MIT
 * @see https://github.com/landakram/remark-wiki-link
 */
// Modified version of:
// https://github.com/landakram/remark-wiki-link/blob/v0.0.4/src/index.js
//
// Replaces:
// "remark-wiki-link": "0.x.x",
const LINK_REGEX = /^\[{2}([^\]]+)\]{2}/;
exports.LINK_REGEX = LINK_REGEX;

const locator = (value, fromIndex) => {
  return value.indexOf("[", fromIndex);
}; // @WARNING:
// This cannot be an arrow function
// because it relies on 'this'.


const wikiLinkPlugin = function (opts = {}) {
  let wikiLinkClassName = opts.wikiLinkClassName || "wiki_link";
  let aliasDivider = opts.aliasDivider || ":";

  const inlineTokenizer = (eat, value) => {
    let match = LINK_REGEX.exec(value);

    if (match) {
      const displayName = match[1].trim();
      let classNames = wikiLinkClassName;
      return eat(match[0])({
        type: "wiki_link",
        data: {
          alias: displayName,
          hName: "span",
          hProperties: {
            className: classNames
          },
          hChildren: [{
            type: "text",
            value: displayName
          }]
        }
      });
    }
  };

  inlineTokenizer.locator = locator;
  const Parser = this.Parser;
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.wiki_link = inlineTokenizer;
  inlineMethods.splice(inlineMethods.indexOf("link"), 0, "wiki_link"); // Stringify for wiki link:

  const Compiler = this.Compiler;

  if (Compiler != null) {
    const visitors = Compiler.prototype.visitors;

    if (visitors) {
      visitors.wiki_link = node => {
        if (node.data.alias != node.value) {
          return `[[${node.value}${aliasDivider}${node.data.alias}]]`;
        }

        return `[[${node.value}]]`;
      };
    }
  }
};

module.exports = wikiLinkPlugin;
//# sourceMappingURL=wiki_link_plugin.js.map