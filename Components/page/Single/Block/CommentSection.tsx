"use client";

import { useState } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import AuthModal from "./AuthModal";

interface Comment {
    id: string;
    author: string;
    avatar: string;
    content: string;
    date: string;
    parent: number;
    replies: Comment[];
}

interface CommentsData {
    total_comments: number;
    threads: Comment[];
}

interface Props {
    data: CommentsData;
    postId: number;
}

interface UserInfo {
    name: string;
    email: string;
}

export default function CommentSection({ data, postId }: Props) {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");
    const [commentText, setCommentText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [pendingAction, setPendingAction] = useState<"comment" | "reply" | null>(null);
    const [sending, setSending] = useState(false);

    const requireAuth = (action: "comment" | "reply") => {
        if (userInfo) {
            if (action === "comment") submitComment();
            else submitReply();
        } else {
            setPendingAction(action);
            setShowModal(true);
        }
    };

    const handleModalSubmit = () => {
        if (!formName.trim() || !formEmail.trim()) return;

        const info = { name: formName.trim(), email: formEmail.trim() };
        setUserInfo(info);
        setShowModal(false);

        if (pendingAction === "comment") submitComment(info);
        else if (pendingAction === "reply") submitReply(info);

        setPendingAction(null);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setPendingAction(null);
    };

    const submitComment = async (info?: UserInfo) => {
        const user = info || userInfo;
        if (!user || !commentText.trim()) return;

        setSending(true);
        try {
            const res = await fetch("/api/wp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    endpoint: "/gvm/v1/comments/add",
                    data: {
                        post_id: postId,
                        content: commentText.trim(),
                        author_name: user.name,
                        author_email: user.email,
                    },
                }),
            });
            if (res.ok) {
                setCommentText("");
                window.location.reload();
            }
        } catch (err) {
            console.error("Comment failed:", err);
        }
        setSending(false);
    };

    const submitReply = async (info?: UserInfo) => {
        const user = info || userInfo;
        if (!user || !replyText.trim() || !replyingTo) return;

        setSending(true);
        try {
            const res = await fetch("/api/wp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    endpoint: "/gvm/v1/comments/add",
                    data: {
                        post_id: postId,
                        parent_id: Number(replyingTo),
                        content: replyText.trim(),
                        author_name: user.name,
                        author_email: user.email,
                    },
                }),
            });
            if (res.ok) {
                setReplyingTo(null);
                setReplyText("");
                window.location.reload();
            }
        } catch (err) {
            console.error("Reply failed:", err);
        }
        setSending(false);
    };

    const handleReply = (id: string) => {
        setReplyingTo(id);
        setReplyText("");
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
        setReplyText("");
    };

    return (
        <>
            <div className="mt-16 max-w-4xl mx-auto">
                <div className="border border-gray-200 rounded-2xl p-6 lg:p-8">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold">Comments</h3>
                        <p className="text-gray-400 text-sm">
                            {data.total_comments} Comments
                        </p>
                    </div>

                    <CommentInput
                        value={commentText}
                        onChange={setCommentText}
                        onSubmit={() => requireAuth("comment")}
                        onCancel={() => setCommentText("")}
                        userName={userInfo?.name}
                    />

                    <div className=" mt-6">
                        {data.threads.map((thread) => (
                            <CommentItem
                                key={thread.id}
                                comment={thread}
                                onReply={handleReply}
                                replyingTo={replyingTo}
                                replyText={replyText}
                                setReplyText={setReplyText}
                                onSubmitReply={() => requireAuth("reply")}
                                onCancelReply={handleCancelReply}
                                userName={userInfo?.name}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {showModal && (
                <AuthModal
                    formName={formName}
                    setFormName={setFormName}
                    formEmail={formEmail}
                    setFormEmail={setFormEmail}
                    onSubmit={handleModalSubmit}
                    onClose={handleModalClose}
                    sending={sending}
                />
            )}
        </>
    );
}