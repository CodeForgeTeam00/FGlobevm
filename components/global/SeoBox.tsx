import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import Link from "next/link";

type Props = {
    content: string;
};

export function WpContent({ content }: Props) {
    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.name === "a") {
                const href = domNode.attribs?.href || "#";
                const isInternal = href.startsWith("/");

                if (isInternal) {
                    return (
                        <Link href={href}>
                            {domToReact(domNode.children, options)}
                        </Link>
                    );
                }

                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {domToReact(domNode.children, options)}
                    </a>
                );
            }
        },
    };

    return <div className="blog-content">{parse(content, options)}</div>;
}