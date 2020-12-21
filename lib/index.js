"use strict";

var _inkdrop = require("inkdrop");

var _wiki_link_plugin = _interopRequireDefault(require("./wiki_link_plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import wiki_link from "./remark_wiki";
// import WikiLink from "./wiki_link";
// wikiLinkPlugin.hrefTemplate = (permalink) => `command://core:find/${permalink}`;
module.exports = {
  activate() {
    // debugger;
    // console.log(wikiLinkPlugin);
    if (_inkdrop.markdownRenderer) {
      // markdownRenderer.remarkPlugins.push(wiki_link);
      _inkdrop.markdownRenderer.remarkPlugins.push(_wiki_link_plugin.default); // markdownRenderer.remarkReactComponents.wiki_link = WikiLink;

    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      // const { remarkPlugins, remarkReactComponents } = markdownRenderer;
      const {
        remarkPlugins
      } = _inkdrop.markdownRenderer; // const i = remarkPlugins.indexOf(wiki_link);

      const i = remarkPlugins.indexOf(_wiki_link_plugin.default);

      if (i >= 0) {
        remarkPlugins.splice(i, 1);
      } // if (remarkReactComponents.wiki_link === WikiLink) {
      //     delete remarkReactComponents.wiki_link;
      // }

    }
  }

};