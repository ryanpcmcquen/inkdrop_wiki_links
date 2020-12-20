"use strict";

var _inkdrop = require("inkdrop");

var _remark_wiki = _interopRequireDefault(require("./remark_wiki"));

var _wiki_link = _interopRequireDefault(require("./wiki_link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  activate() {
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkPlugins.push(_remark_wiki.default);

      _inkdrop.markdownRenderer.remarkReactComponents.wiki_link = _wiki_link.default;
    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      const {
        remarkPlugins,
        remarkReactComponents
      } = _inkdrop.markdownRenderer;
      const i = remarkPlugins.indexOf(_remark_wiki.default);

      if (i >= 0) {
        remarkPlugins.splice(i, 1);
      }

      if (remarkReactComponents.wiki_link === _wiki_link.default) {
        delete remarkReactComponents.wiki_link;
      }
    }
  }

};
//# sourceMappingURL=index.js.map