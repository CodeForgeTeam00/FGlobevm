import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";


import { clsx } from "clsx";

const buttonVariants = cva(

    "flex items-center justify-center gap-2 ",
    {
        variants: {
            variant: {
                primary:
                    "!bg-primary-6 border !border-primary-6  text-neutral-0",
                default:
                    "h-14 px-4 gap-2 rounded-2xl border border-primary bg-primary text-primary-foreground hover:bg-primary/90",

                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-neutral-40 bg-background ",
                secondary:
                    "bg-secondary-6 text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "",
                sm: "h-12 rounded-xl px-4 py-1",
                lg: "py-[15px] rounded-2xl px-4",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        const bemClasses = clsx(
            "button",
            variant && `button--${variant}`,
            size && `button--size-${size}`
        );

        return (
            <Comp

                className={clsx(
                    buttonVariants({ variant, size }),
                    bemClasses,
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
