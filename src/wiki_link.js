"use babel";
import * as React from "react";
import PropTypes from "prop-types";

export default class WikiLink extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.string),
    };

    render() {
        const link = this.props.children[0];
        if (link) {
            debugger;
            try {
                return (
                    <a
                        href=""
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
