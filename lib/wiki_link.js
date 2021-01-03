"use strict";
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _inkdrop, _inkdrop$main, _inkdrop$main$dataSto;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const db = inkdrop && ((_inkdrop = inkdrop) === null || _inkdrop === void 0 ? void 0 : (_inkdrop$main = _inkdrop.main) === null || _inkdrop$main === void 0 ? void 0 : (_inkdrop$main$dataSto = _inkdrop$main.dataStore) === null || _inkdrop$main$dataSto === void 0 ? void 0 : _inkdrop$main$dataSto.getLocalDB());

const createRemarkWikiLink = OriginalSpan => {
  const WikiLink = props => {
    const link = props.children[0];

    if (link) {
      try {
        const attributes = _objectSpread({
          // href: `inkdrop://note/${link}`,
          onClick: event => {
            event.preventDefault();
            event.stopPropagation();

            if (inkdrop.isMobile) {
              inkdrop.commands.dispatch(document.body, "core:search-notes", {
                keyword: `title:${link}`
              });
            } else if (db) {
              db.utils.search(`title:${link}`).then(note => {
                let noteToOpenId;
                let isNewNote;

                if (note !== null && note !== void 0 && note.docs && note.docs.length > 0) {
                  noteToOpenId = note.docs[0]._id;
                  isNewNote = false;
                } else {
                  const {
                    editingNote
                  } = inkdrop.store.getState();
                  noteToOpenId = db.notes.createId();
                  db.notes.put({
                    bookId: editingNote.bookId,
                    doctype: editingNote.doctype,
                    _id: noteToOpenId,
                    _rev: undefined,
                    body: "",
                    title: link,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                  });
                  isNewNote = true;
                }

                inkdrop.commands.dispatch(document.body, "core:open-note", {
                  noteId: noteToOpenId
                });

                if (isNewNote) {
                  inkdrop.commands.dispatch(document.body, "view:toggle-preview");
                }

                inkdrop.commands.dispatch(document.body, "editor:focus");
              });
            }

            return false;
          },
          renderError: error => {
            return /*#__PURE__*/React.createElement("span", {
              className: "ui error message mde-error-message"
            }, error.message);
          }
        }, props);

        if (OriginalSpan) {
          return /*#__PURE__*/React.createElement(OriginalSpan, props, props.children);
        } else {
          return /*#__PURE__*/React.createElement("span", attributes, link);
        }
      } catch (e) {
        return /*#__PURE__*/React.createElement("span", null, e.message);
      }
    } else {
      return /*#__PURE__*/React.createElement("span", null, "Invalid Wiki Link");
    }
  };

  return WikiLink;
};

var _default = createRemarkWikiLink;
exports.default = _default;
//# sourceMappingURL=wiki_link.js.map