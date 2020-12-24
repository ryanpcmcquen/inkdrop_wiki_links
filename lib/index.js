"use strict";

var _inkdrop = require("inkdrop");

var _wiki_link = _interopRequireDefault(require("./wiki_link"));

var _wiki_link_plugin = _interopRequireDefault(require("./wiki_link_plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  originalSpanComponent: null,

  setWikiLinkComponent() {
    const OriginalSpan = _inkdrop.markdownRenderer.remarkReactComponents.span;
    const WikiLink = (0, _wiki_link.default)(OriginalSpan);
    _inkdrop.markdownRenderer.remarkReactComponents.span = WikiLink;
    this.originalSpanComponent = OriginalSpan;
  },

  unsetWikiLinkComponent() {
    _inkdrop.markdownRenderer.remarkReactComponents.span = this.originalSpanComponent;
  },

  activate() {
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkPlugins.push(_wiki_link_plugin.default);

      if (!inkdrop.isMobile) {
        this.setWikiLinkComponent();
      }
    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkPlugins = _inkdrop.markdownRenderer.remarkPlugins.filter(plugin => plugin !== _wiki_link_plugin.default);

      if (!inkdrop.isMobile) {
        this.unsetWikiLinkComponent();
      }
    }
  }

};