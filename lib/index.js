"use strict";

var _inkdrop = require("inkdrop");

var _wiki_link = _interopRequireDefault(require("./wiki_link"));

var _wiki_link_plugin = _interopRequireDefault(require("./wiki_link_plugin"));

var _core = require("@textcomplete/core");

var _codemirror = require("@textcomplete/codemirror");

var _wiki_completions = require("./wiki_completions");

var _codemirror2 = _interopRequireDefault(require("codemirror"));

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

  /** @param {CodeMirror.Editor} editor  **/
  handleEditorDidLoad(editor) {
    const {
      cm
    } = editor; //const cm = CodeMirror(document.getElementById('editor'))
    //cm.on(document.body,"beforeChange", (e)=>{e.preventDefault(); e.stopPropagation(); CodeMirror.Pass});

    const cmEditor = new _codemirror.CodeMirrorEditor(codeMirror);
    const textcomplete = new _core.Textcomplete(cmEditor, [_wiki_completions.strategy], _wiki_completions.option);
  }

};