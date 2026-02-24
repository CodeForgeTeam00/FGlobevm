"use client"

type User = {
    name: string
    image: string
}

const users: User[] = [
    { name: "shadcn", image: "https://github.com/shadcn.png" },
    { name: "maxleiter", image: "https://github.com/maxleiter.png" },
    { name: "evilrabbit", image: "https://github.com/evilrabbit.png" },
]

export function AvatarGroupExample() {
    return (
        <div className="flex -space-x-8 grayscale">
            {users.map((user) => (
                <div
                    key={user.name}
                    className="relative w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                >
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    )
}