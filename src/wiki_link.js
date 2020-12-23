"use babel";
import * as React from "react";
import PropTypes from "prop-types";

const createRemarkWikiLink = (OriginalAnchor) => {
    return class WikiLink extends React.Component {
        static propTypes = {
            children: PropTypes.arrayOf(PropTypes.string),
        };

        render() {
            const link = this.props.children[0];

            if (link) {
                try {
                    const attributes = {
                        // href: `inkdrop:://note/${link}`,
                        renderError: (error) => {
                            return (
                                <span className="ui error message mde-error-message">
                                    {error.message}
                                </span>
                            );
                        },
                        onClick: () =>
                            inkdrop.commands.dispatch(
                                document.body,
                                "core:search-notes",
                                {
                                    keyword: `title:${link}`,
                                }
                            ),
                        style: {
                            textDecoration: "underline",
                            cursor: "pointer",
                        },
                    };
                    if (OriginalAnchor) {
                        return (
                            <OriginalAnchor {...attributes}>
                                {link}
                            </OriginalAnchor>
                        );
                    } else {
                        return <a {...attributes}>{link}</a>;
                    }
                } catch (e) {
                    return <span>{e.message}</span>;
                }
            } else {
                return <span>Invalid Wiki Link</span>;
            }
        }
    };
};

export default createRemarkWikiLink;
