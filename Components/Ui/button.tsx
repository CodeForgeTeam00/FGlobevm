import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "cursor-pointer border",
    {
      variants: {
        variant: {
          primary: "bg-primary-6 text-neutral-0 border-primary-6",
          outline: "bg-neutral-0 border-neutral-40",
          ghost: "border-transparent bg-transparent hover:bg-neutral-10",
        },
        size: {
          default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
          lg: "h-14 py-1 rounded-2xl gap-2 px-4",
          icon: "h-8 w-8 flex items-center justify-center p-0",
        },
      },
      defaultVariants: {
        variant: "primary",
        size: "default",
      },
    }
)

function Button({
                  className,
                  variant,
                  size,
                  asChild = false,
                  ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
      <Comp
          data-slot="button"
          data-variant={variant}
          data-size={size}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
      />
  )
}

export { Button, buttonVariants }