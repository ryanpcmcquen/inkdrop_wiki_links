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

const WikiLink = props => {
  return /*#__PURE__*/React.createElement("a", {
    class: "wiki_link"
  });
};

var _default = WikiLink;
/*
class WikiLink extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.string),
    };

    render() {
        const link = this.props.children[0];

        console.log(link);
        console.log(this.props);
        if (link) {
            try {
                return (
                    <a
                        onClick={() =>
                            inkdrop.commands.dispatch(
                                document.body,
                                "core:search-notes",
                                {
                                    // title: "note:uugSvPq5r",
                                    title: link,
                                }
                            )
                        }
                        renderError={(error) => {
                            return (
                                <span className="ui error message mde-error-message">
                                    {error.message}
                                </span>
                            );
                        }}
                    >
                        {link}
                    </a>
                );
            } catch (e) {
                return <span>{e.message}</span>;
            }
        } else {
            return <span>Invalid Wiki Link</span>;
        }
    }
}
*/

exports.default = _default;