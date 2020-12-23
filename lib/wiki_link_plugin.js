"use strict";

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
const LINK_REGEX = /^\[\[(.+?)\]\]/;

function locator(value, fromIndex) {
  return value.indexOf("[", fromIndex);
}

function wikiLinkPlugin(opts = {}) {
  let wikiLinkClassName = opts.wikiLinkClassName || "wiki_link";
  let aliasDivider = opts.aliasDivider || ":";

  function inlineTokenizer(eat, value) {
    let match = LINK_REGEX.exec(value);

    if (match) {
      const displayName = match[1].trim();
      let classNames = wikiLinkClassName;
      return eat(match[0])({
        type: "wikiLink",
        data: {
          alias: displayName,
          hName: "a",
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
  }

  inlineTokenizer.locator = locator;
  const Parser = this.Parser;
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.wikiLink = inlineTokenizer;
  inlineMethods.splice(inlineMethods.indexOf("link"), 0, "wikiLink"); // Stringify for wiki link

  const Compiler = this.Compiler;

  if (Compiler != null) {
    const visitors = Compiler.prototype.visitors;

    if (visitors) {
      visitors.wikiLink = function (node) {
        if (node.data.alias != node.value) {
          return `[[${node.value}${aliasDivider}${node.data.alias}]]`;
        }

        return `[[${node.value}]]`;
      };
    }
  }
}

module.exports = wikiLinkPlugin;