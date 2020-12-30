"use strict";

var _inkdrop = require("inkdrop");

var _wiki_link = _interopRequireDefault(require("./wiki_link"));

var _wiki_link_plugin = _interopRequireDefault(require("./wiki_link_plugin"));

var _core = require("@textcomplete/core");

var _codemirror = require("@textcomplete/codemirror");

var _wiki_completions = require("./wiki_completions");

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

    global.inkdrop.onEditorLoad(editor => this.handleEditorDidLoad(editor));
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkPlugins = _inkdrop.markdownRenderer.remarkPlugins.filter(plugin => plugin !== _wiki_link_plugin.default);

      if (!inkdrop.isMobile) {
        this.unsetWikiLinkComponent();
      }
    }
  },

  handleEditorDidLoad(editor) {
    const {
      cm
    } = editor; //const cm = CodeMirror(document.getElementById('editor'))

    const mde = editor; //inkdrop.getActiveEditorOrThrow()

    const cmEditor = new _codemirror.CodeMirrorEditor(mde.cm);
    const textcomplete = new _core.Textcomplete(cmEditor, [_wiki_completions.strategy], _wiki_completions.option);
  }

};