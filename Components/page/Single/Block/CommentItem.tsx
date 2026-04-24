"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/Components/Ui/button";
import CommentAvatar from "./CommentAvatar";
import UserAvatar from "./UserAvatar";

interface Comment {
    id: string;
    author: string;
    avatar: string;
    content: string;
    date: string;
    parent: number;
    replies: Comment[];
}

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} Days Ago`;
    if (diffHours > 0) return `${diffHours} Hours Ago`;
    return "Just Now";
}

interface Props {
    comment: Comment;
    depth?: number;
    onReply: (id: string) => void;
    replyingTo: string | null;
    replyText: string;
    setReplyText: (text: string) => void;
    onSubmitReply: () => void;
    onCancelReply: () => void;
    userName?: string;
    parentAuthor?: string;
}

export default function CommentItem({
                                        comment,
                                        depth = 0,
                                        onReply,
                                        replyingTo,
                                        replyText,
                                        setReplyText,
                                        onSubmitReply,
                                        onCancelReply,
                                        userName,
                                        parentAuthor,
                                    }: Props) {
    const [showReplies, setShowReplies] = useState(false);
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isReplying = replyingTo === comment.id;

    return (
        <div className={`${depth > 0 ? "  " : ""}`}>
            <div className="flex gap-3 py-4">
                <div className="flex-shrink-0">
                    <CommentAvatar avatar={comment.avatar} name={comment.author} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-gray-900">
                            {comment.author}
                        </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        {parentAuthor && (
                            <span className="text-primary-6 font-medium">@{parentAuthor} </span>
                        )}
                        {comment.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{timeAgo(comment.date)}</span>
                        <button
                            onClick={() => onReply(comment.id)}
                            className="flex items-center cursor-pointer gap-1 text-primary-6 hover:text-primary-6/80 transition"
                        >
                            <MessageSquare className="w-3 h-3" />
                            Answer
                        </button>
                    </div>

                    {isReplying && (
                        <div className="mt-3 flex items-center gap-3">
                            <UserAvatar name={userName} />
                            <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write Your Comment..."
                                className="flex-1 border rounded-2xl border-neutral-30 bg-transparent py-2 text-sm outline-none transition"
                                autoFocus
                            />
                            <div className="flex items-center gap-3 text-sm">
                                <Button
                                    variant="ghost"
                                    onClick={onCancelReply}
                                    className="text-red-400 flex cursor-pointer items-center gap-1"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={onSubmitReply}
                                    className="text-gray-700 flex cursor-pointer items-center gap-1"
                                >
                                    Send Comment
                                    <MessageSquare className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {hasReplies && !showReplies && (
                        <button
                            onClick={() => setShowReplies(true)}
                            className="mt-3 text-primary-6 cursor-pointer text-xs font-medium flex items-center gap-1"
                        >
                            Show All Responses ({comment.replies.length}) ——
                        </button>
                    )}
                </div>
            </div>

            {hasReplies && showReplies && (
                <div>
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            depth={depth + 1}
                            onReply={onReply}
                            replyingTo={replyingTo}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            onSubmitReply={onSubmitReply}
                            onCancelReply={onCancelReply}
                            userName={userName}
                            parentAuthor={comment.author}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}