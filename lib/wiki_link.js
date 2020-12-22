"use strict";
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRemarkWikiLink;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const WikiLink = (props) => {
// return <a class="wiki_link"></a>;
// };
// export default WikiLink;
function createRemarkWikiLink(OrigA) {
  var _class, _temp;

  return _temp = _class = class WikiLink extends React.Component {
    render() {
      const link = this.props.children[0];
      console.log(link);
      console.log(this.props);
      debugger;

      if (link) {
        try {
          return /*#__PURE__*/React.createElement("a", {
            onClick: () => inkdrop.commands.dispatch(document.body, "core:search-notes", {
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

  }, _defineProperty(_class, "propTypes", {
    children: _propTypes.default.arrayOf(_propTypes.default.string)
  }), _temp;
}