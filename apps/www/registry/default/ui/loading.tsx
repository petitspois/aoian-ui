"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const loadingItemVariants = cva("rounded-full bg-primary", {
  variants: {
    size: {
      sm: "h-0.5 w-0.5 animate-loading-move-min",
      default: "h-1 w-1 animate-loading-move",
      lg: "h-2 w-2 animate-loading-move",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const Loading = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof loadingItemVariants> & { itemClassName?: string }
>(({ className, itemClassName, size, ...props }, ref) => {
  return (
    <span
      className={cn("relative h-full flex items-center gap-2 p-1", className)}
      ref={ref}
      {...props}
    >
      <i
        className={cn("delay-0", loadingItemVariants({ size }), itemClassName)}
      ></i>
      <i
        className={cn(
          "delay-200",
          loadingItemVariants({ size }),
          itemClassName
        )}
      ></i>
      <i
        className={cn(
          "delay-400",
          loadingItemVariants({ size }),
          itemClassName
        )}
      ></i>
    </span>
  )
})

Loading.displayName = "Loading"

export { Loading }
