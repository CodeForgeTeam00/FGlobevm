import Image from "next/image";

const AVATAR_COLORS = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-red-500",
    "bg-indigo-500",
];

export function getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function CommentAvatar({ avatar, name }: { avatar: string; name: string }) {
    const isDefaultGravatar = avatar.includes("d=mm") || avatar.includes("d=blank");

    if (isDefaultGravatar) {
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

    return (
        <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
            unoptimized
        />
    );
}