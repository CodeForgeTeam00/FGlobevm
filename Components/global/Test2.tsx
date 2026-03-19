"use client";

import { useState } from "react";

export default function RevalidateButton() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleClick = async () => {
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/revalidate?tag=services", {
                method: "POST",
            });
            const data = await res.json();

            if (data.revalidated) {
                setMessage(`✅ Cache revalidated at ${new Date(data.now).toLocaleTimeString()}`);
            } else {
                setMessage("❌ Revalidation failed");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-4">
            <button
                onClick={handleClick}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Revalidating..." : "Revalidate Services"}
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
}