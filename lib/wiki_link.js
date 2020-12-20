"use strict";
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WikiLink extends React.Component {
  render() {
    debugger;
    const link = this.props.children[0];

    if (link) {
      debugger;

      try {
        return /*#__PURE__*/React.createElement("a", {
          onClick: inkdrop.commands.dispatch(document.body, "core:search-notes", {
            // title: "note:uugSvPq5r",
            title: link
          }),
          renderError: error => {
            return /*#__PURE__*/React.createElement("span", {
              className: "ui error message mde-error-message"
            }, error.message);
          }
        }, link);
      } catch (e) {
        return /*#__PURE__*/React.createElement("span", null, e.message);
      }
    } else {
      return /*#__PURE__*/React.createElement("span", null, "Invalid Wiki Link");
    }
  }

}

exports.default = WikiLink;

_defineProperty(WikiLink, "propTypes", {
  children: _propTypes.default.arrayOf(_propTypes.default.string)
});