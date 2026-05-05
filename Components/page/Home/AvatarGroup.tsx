"use client"

type User = {
    name: string
    image: string
}

const users: User[] = [
    { name: "evilrabbit", image: "/assets/image/avatrComent1.jpg" },
    { name: "evilrabbit", image: "/assets/image/avatrComent2.jpg" },
    { name: "evilrabbit", image: "/assets/image/avatrComent3.jpg" },
]

export function AvatarGroupImage() {
    return (
        <div className="flex -space-x-8 ">
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