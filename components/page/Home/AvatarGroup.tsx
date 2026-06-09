"use client"
import Image from "next/image";
type User = {
    id: number
    name: string
    image: string
}
const users: User[] = [
    { id: 1, name: "GlobeVM client", image: "/assets/image/avatrComent1.jpg" },
    { id: 2, name: "GlobeVM client", image: "/assets/image/avatrComent2.jpg" },
    { id: 3, name: "GlobeVM client", image: "/assets/image/avatrComent3.jpg" },
]
export function AvatarGroupImage() {
    return (
        <div className="flex -space-x-8">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="relative w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                >
                    <Image
                        src={user.image}
                        alt={`${user.name} ${user.id}`}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    )
}