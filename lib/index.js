"use strict";

var _inkdrop = require("inkdrop");

var _wiki_link = _interopRequireDefault(require("./wiki_link"));

var _wiki_link_plugin = _interopRequireDefault(require("./wiki_link_plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import wiki_link from "./remark_wiki";
// wikiLinkPlugin.hrefTemplate = (permalink) => `command://core:find/${permalink}`;
module.exports = {
  originalAnchorComponent: null,

  activate() {
    // debugger;
    // console.log(wikiLinkPlugin);
    if (_inkdrop.markdownRenderer) {
      // markdownRenderer.remarkPlugins.push(wiki_link);
      _inkdrop.markdownRenderer.remarkPlugins.push(_wiki_link_plugin.default); // markdownRenderer.remarkReactComponents.wiki_link = WikiLink;


      !inkdrop.isMobile && this.setWikiLinkComponent();
    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      // const { remarkPlugins, remarkReactComponents } = markdownRenderer;
      // const { remarkPlugins } = markdownRenderer;
      // const i = remarkPlugins.indexOf(wiki_link);
      // const i = remarkPlugins.indexOf(wikiLinkPlugin);
      // if (i >= 0) {
      // remarkPlugins.splice(i, 1);
      // }
      _inkdrop.markdownRenderer.remarkPlugins = _inkdrop.markdownRenderer.remarkPlugins.filter(plugin => plugin !== WikiLink);
      !inkdrop.isMobile && this.unsetWikiLinkComponent(); // if (remarkReactComponents.wiki_link === WikiLink) {
      //     delete remarkReactComponents.wiki_link;
      // }
    }
  },

  setWikiLinkComponent() {
    const OriginalAnchor = _inkdrop.markdownRenderer.remarkReactComponents.a;
    const WikiLink = (0, _wiki_link.default)(OriginalAnchor);
    _inkdrop.markdownRenderer.remarkReactComponents.a = WikiLink;
    this.originalAnchorComponent = OriginalAnchor;
  },

  unsetWikiLinkComponent() {
    _inkdrop.markdownRenderer.remarkReactComponents.a = this.originalAnchorComponent;
  }

};