"use babel";
import * as React from "react";
import PropTypes from "prop-types";

const db = inkdrop && inkdrop?.main?.dataStore?.getLocalDB();

const createRemarkWikiLink = (OriginalSpan) => {
    return class WikiLink extends React.Component {
        static propTypes = {
            children: PropTypes.arrayOf(PropTypes.string),
        };

        render() {
            debugger;
            const link = this.props.children[0];
            if (link) {
                try {
                    const attributes = {
                        className: "wiki_link",
                        // href: `inkdrop://note/${link}`,
                        onClick: (event) => {
                            debugger;
                            if (db) {
                                event.preventDefault();
                                event.stopPropagation();
                                db.utils
                                    .search(`title:${link}`)
                                    .then((note) => {
                                        debugger;
                                        let noteToOpenId;
                                        if (
                                            note?.docs &&
                                            note.docs.length > 0
                                        ) {
                                            noteToOpenId = note.docs[0]._id;
                                        } else {
                                            const {
                                                editingNote,
                                            } = inkdrop.store.getState();
                                            noteToOpenId = db.notes.createId();
                                            db.notes.put({
                                                ...editingNote,
                                                _id: noteToOpenId,
                                                _rev: undefined,
                                                body: "",
                                                title: link,
                                                createdAt: Date.now(),
                                                updatedAt: Date.now(),
                                            });
                                        }
                                        inkdrop.commands.dispatch(
                                            document.body,
                                            "core:open-note",
                                            { noteId: noteToOpenId }
                                        );
                                    });

                                return false;
                            }
                        },
                        renderError: (error) => {
                            return (
                                <span className="ui error message mde-error-message">
                                    {error.message}
                                </span>
                            );
                        },
                    };
                    if (OriginalSpan) {
                        return <OriginalSpan />;
                    } else {
                        // debugger;
                        return <span {...attributes}>{link}</span>;
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
