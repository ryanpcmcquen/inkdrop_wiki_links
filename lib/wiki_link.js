"use strict";
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

if (!inkdrop.isMobile) {
  var _inkdrop, _inkdrop$main, _inkdrop$main$dataSto;

  const db = inkdrop && ((_inkdrop = inkdrop) === null || _inkdrop === void 0 ? void 0 : (_inkdrop$main = _inkdrop.main) === null || _inkdrop$main === void 0 ? void 0 : (_inkdrop$main$dataSto = _inkdrop$main.dataStore) === null || _inkdrop$main$dataSto === void 0 ? void 0 : _inkdrop$main$dataSto.getLocalDB());
}

const createRemarkWikiLink = OriginalSpan => {
  const WikiLink = props => {
    const link = props.children[0];

    if (link) {
      try {
        const attributes = {
          // href: `inkdrop://note/${link}`,
          onClick: event => {
            event.preventDefault();
            event.stopPropagation();

            if (inkdrop.isMobile) {} else {
              db.utils.search(`title:${link}`).then(note => {
                let noteToOpenId;

                if (note !== null && note !== void 0 && note.docs && note.docs.length > 0) {
                  noteToOpenId = note.docs[0]._id;
                } else {
                  const {
                    editingNote
                  } = inkdrop.store.getState();
                  noteToOpenId = db.notes.createId();
                  db.notes.put({ ...editingNote,
                    _id: noteToOpenId,
                    _rev: undefined,
                    body: "",
                    title: link,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                  });
                }

                inkdrop.commands.dispatch(document.body, "core:open-note", {
                  noteId: noteToOpenId
                });
              });
            }

            return false;
          },
          renderError: error => {
            return /*#__PURE__*/React.createElement("span", {
              className: "ui error message mde-error-message"
            }, error.message);
          },
          ...props
        };

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