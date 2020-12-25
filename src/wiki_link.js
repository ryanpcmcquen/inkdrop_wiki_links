"use babel";
import * as React from "react";

if (!inkdrop.isMobile) {
    const db = inkdrop && inkdrop?.main?.dataStore?.getLocalDB();
}

const createRemarkWikiLink = (OriginalSpan) => {
    const WikiLink = (props) => {
        const link = props.children[0];

        if (link) {
            try {
                const attributes = {
                    // href: `inkdrop://note/${link}`,
                    onClick: (event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        if (inkdrop.isMobile) {
                        } else if (db) {
                            db.utils.search(`title:${link}`).then((note) => {
                                let noteToOpenId;
                                if (note?.docs && note.docs.length > 0) {
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
                        }

                        return false;
                    },
                    renderError: (error) => {
                        return (
                            <span className="ui error message mde-error-message">
                                {error.message}
                            </span>
                        );
                    },
                    ...props,
                };
                if (OriginalSpan) {
                    return (
                        <OriginalSpan {...props}>{props.children}</OriginalSpan>
                    );
                } else {
                    return <span {...attributes}>{link}</span>;
                }
            } catch (e) {
                return <span>{e.message}</span>;
            }
        } else {
            return <span>Invalid Wiki Link</span>;
        }
    };

    return WikiLink;
};

export default createRemarkWikiLink;
