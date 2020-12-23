"use strict";

var _inkdrop = require("inkdrop");

var _wiki_link = _interopRequireDefault(require("./wiki_link"));

var _wiki_link_plugin = _interopRequireDefault(require("./wiki_link_plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  originalAnchorComponent: null,

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
      _inkdrop.markdownRenderer.remarkPlugins = _inkdrop.markdownRenderer.remarkPlugins.filter(plugin => plugin !== WikiLink);

      if (!inkdrop.isMobile) {
        this.unsetWikiLinkComponent();
      }
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