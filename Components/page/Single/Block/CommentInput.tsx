import { MessageSquare, X } from "lucide-react";
import { Button } from "@/Components/Ui/button";
import UserAvatar from "./UserAvatar";

interface Props {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    userName?: string;
}

export default function CommentInput({ value, onChange, onSubmit, onCancel, userName }: Props) {
    return (
        <div className="flex gap-2 items-start">
            <UserAvatar name={userName} />
            <div className="flex flex-1 flex-col gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Write Your Comment..."
                    className="flex-1 border border-neutral-30 p-3 bg-transparent rounded-2xl text-sm outline-none placeholder:text-gray-300"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && value.trim()) {
                            onSubmit();
                        }
                    }}
                />
                {value.trim() && (
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            className="text-red-400 text-sm flex items-center gap-1"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onSubmit}
                            className="text-gray-700 text-sm flex items-center gap-1"
                        >
                            Send Comment
                            <MessageSquare className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}