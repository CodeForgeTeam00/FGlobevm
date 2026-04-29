import React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const textVariants = cva("font-sans", {
    variants: {
        variant: {
            // Headings (mobile → desktop) - exactly 4 like Figma
            "heading-lg": "text-2xl lg:text-4xl font-bold leading-10 lg:leading-relaxed",
            "heading-md": "text-xl lg:text-3xl font-bold leading-9 lg:leading-relaxed",
            "heading-sm": "text-lg lg:text-2xl font-bold leading-8 lg:leading-10",
            "heading-xs": "text-base lg:text-xl font-bold leading-8 lg:leading-9",

            // Body (mobile → desktop)
            "body-lg": "text-base lg:text-lg font-medium leading-7 lg:leading-8",
            "body-md": "text-sm lg:text-base font-medium leading-6 lg:leading-7",
            "body-sm": "text-xs lg:text-sm font-medium leading-5 lg:leading-6",
            // Card Components (mobile → desktop)
            "card-tag": "text-xs font-medium leading-4 lg:leading-5",
            "card-caption": "text-xs lg:text-sm font-medium leading-5 lg:leading-7",
            "card-subtitle-md": "text-xs lg:text-sm font-medium leading-5 lg:leading-7",
            "card-subtitle-lg": "text-sm lg:text-base font-medium leading-7 lg:leading-8",
            "card-title-md": "text-sm lg:text-base font-bold leading-7 lg:leading-8",
            "card-title-lg": "text-base lg:text-lg font-bold leading-8",

            // UI Components (mobile → desktop)
            "label": "text-xs font-medium leading-4 lg:leading-5",
            "link": "text-xs lg:text-sm font-medium leading-5 lg:leading-7",
        },
        textColor: {
            default:"inherit",
            "black": "text-neutral-900",
            "muted": "text-neutral-500",
            "light": "text-neutral-300",
            "primary": "text-primary-6",
            "white": "text-white",
            "inherit": "text-inherit",
        },
        align: {
            "left": "text-left",
            "center": "text-center",
            "right": "text-right",
        },
    },
    defaultVariants: {
        variant: "body-md",
        textColor: "default",
    },
});

type ValidTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label" | "li" | "a";

const TAG_MAP: Record<string, ValidTag> = {
    "heading-lg": "h1",
    "heading-md": "h2",
    "heading-sm": "h3",
    "heading-xs": "h4",
    "body-lg": "p",
    "body-md": "p",
    "body-sm": "p",
    "card-tag": "span",
    "card-caption": "span",
    "card-subtitle-md": "span",
    "card-subtitle-lg": "p",
    "card-title-md": "p",
    "card-title-lg": "p",
    "label": "span",
    "link": "a",
};

interface TextProps extends VariantProps<typeof textVariants> {
    as?: ValidTag;
    className?: string;
    children: React.ReactNode;
    id?: string;
}

export default function Text({
                                 variant,
                                 textColor,
                                 align,
                                 as,
                                 className,
                                 children,
                                 ...props
                             }: TextProps) {
    const Component = as || TAG_MAP[variant || "body-md"] || "p";

    return React.createElement(
        Component,
        {
            className: cn(textVariants({variant, textColor, align}), className),
            ...props,
        },
        children
    );
}