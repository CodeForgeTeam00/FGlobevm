import { AvatarIcon } from "@/components/global/Icons";
import { getAvatarColor } from "./CommentAvatar";

export default function UserAvatar({ name }: { name?: string }) {
    if (!name) {
        return <AvatarIcon className="w-12 h-12 text-neutral-100" />;
    }

    const firstLetter = name.charAt(0).toUpperCase();
    const colorClass = getAvatarColor(name);

    return (
        <div
            className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
        >
            {firstLetter}
        </div>
    );
}