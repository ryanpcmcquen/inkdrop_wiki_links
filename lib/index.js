"use strict";

var _inkdrop = require("inkdrop");

var _wiki_link = _interopRequireDefault(require("./wiki_link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  activate() {
    console.log("hello!");

    if (_inkdrop.markdownRenderer) {
      debugger;
      _inkdrop.markdownRenderer.remarkCodeComponents.wiki = _wiki_link.default;
    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      const {
        remarkPlugins,
        remarkCodeComponents
      } = _inkdrop.markdownRenderer;
      const i = remarkPlugins.indexOf(wiki);
      if (i >= 0) remarkPlugins.splice(i, 1);

      if (remarkCodeComponents.wiki === _wiki_link.default) {
        delete remarkCodeComponents.wiki;
      }
    }
  }

};
//# sourceMappingURL=index.js.map