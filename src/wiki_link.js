"use babel";
import * as React from "react";
import PropTypes from "prop-types";

const db = inkdrop.main.dataStore.getLocalDB();

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
                        className: "wiki_link",
                        onClick: () => {
                            db.utils.search(`title:${link}`).then((note) => {
                                if (note?.docs && note.docs.length > 0) {
                                    inkdrop.commands.dispatch(
                                        document.body,
                                        "core:open-note",
                                        { noteId: note.docs[0]._id }
                                    );
                                } else {
                                    const {
                                        editingNote,
                                    } = inkdrop.store.getState();
                                    debugger;
                                    db.notes.put({
                                        ...editingNote,
                                        _id: db.notes.createId(),
                                        body: "",
                                        title: link,
                                        createdAt: Date.now(),
                                        updatedAt: Date.now(),
                                    });
                                }
                            });
                        },
                        renderError: (error) => {
                            return (
                                <span className="ui error message mde-error-message">
                                    {error.message}
                                </span>
                            );
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
