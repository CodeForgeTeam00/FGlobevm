import Image from "next/image";

interface ImageBlockProps {
    data: {
        url: string;
        alt: string;
    };
}

export function ImageBlock({ data }: ImageBlockProps) {
    return (
        <div className="my-8 rounded-2xl overflow-hidden">
            <Image
                src={data.url}
                alt={data.alt || "Blog image"}
                width={900}
                height={500}
                className="w-full h-auto object-cover"
            />
        </div>
    );
}