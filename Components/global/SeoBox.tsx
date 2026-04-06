import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { Element } from "domhandler";
type Props = {
    content: string;
};

export function WpContent({ content }: Props) {

    const cleanHtml = DOMPurify.sanitize(content);

    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.name === "a") {
                const href = domNode.attribs?.href || "#";
                const isInternal = href.startsWith("/");

                if (isInternal) {
                    return (
                        <Link href={href} className="text-blue-600 ">
                            {domToReact(domNode.children, options)}
                        </Link>
                    );
                }

                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 "
                    >
                        {domToReact(domNode.children, options)}
                    </a>
                );
            }

            if (domNode.name === "ul") {
                return (
                    <ul className="list-disc pl-5 mb-4">
                        {domToReact(domNode.children, options)}
                    </ul>
                );
            }

            if (domNode.name === "li") {
                return (
                    <li className="mb-2">{domToReact(domNode.children, options)}</li>
                );
            }

            if (domNode.name === "h3") {
                return (
                    <h3 className="text-lg font-bold mb-3">
                        {domToReact(domNode.children, options)}
                    </h3>
                );
            }
        },
    };

    return <div className="text-gray-800 leading-7">{parse(cleanHtml, options)}</div>;
}