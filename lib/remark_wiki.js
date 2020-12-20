"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _wiki_link_parser = _interopRequireDefault(require("./wiki_link_parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(processor) {
  const Parser = this.Parser;
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.wiki_link = _wiki_link_parser.default; // debugger;

  inlineMethods.splice(inlineMethods.indexOf("text"), 0, "wiki_link");
}