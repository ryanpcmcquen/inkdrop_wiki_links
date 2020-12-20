"use babel";
import * as React from "react";
import PropTypes from "prop-types";
import "inkdrop";

export default class WikiLink extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.string),
    };

    render() {
        debugger;
        const link = this.props.children[0];
        if (link) {
            debugger;
            try {
                return (
                    <a
                        onClick={inkdrop.commands.dispatch(
                            document.body,
                            "core:search-notes",
                            {
                                // title: "note:uugSvPq5r",
                                title: link,
                            }
                        )}
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
