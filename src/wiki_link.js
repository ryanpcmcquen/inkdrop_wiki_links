"use babel";
import * as React from "react";
import PropTypes from "prop-types";

// const WikiLink = (props) => {
// return <a class="wiki_link"></a>;
// };

// export default WikiLink;

export default function createRemarkWikiLink(OriginalAnchor) {
    return class WikiLink extends React.Component {
        static propTypes = {
            children: PropTypes.arrayOf(PropTypes.string),
        };

        render() {
            const link = this.props.children[0];

            console.log(link);
            console.log(this.props);
            // debugger;
            if (link) {
                try {
                    if (OriginalAnchor) {
                        return (
                            <OriginalAnchor
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
                            >
                                {link}
                            </OriginalAnchor>
                        );
                    } else {
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
                    }
                } catch (e) {
                    return <span>{e.message}</span>;
                }
            } else {
                return <span>Invalid Wiki Link</span>;
            }
        }
    };
}
