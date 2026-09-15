"use client";

import { useState } from "react";
import AuthorContactModal from "./Authorcontactmodal";

interface Props {
    authorName: string;
    authorSlug: string;
}

export default function AskAuthorButton({ authorName, authorSlug }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
                Ask {authorName.split(" ")[0]} a Question
            </button>
            <AuthorContactModal
                authorName={authorName}
                authorSlug={authorSlug}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
