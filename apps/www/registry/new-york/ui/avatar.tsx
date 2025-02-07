"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "inline-flex justify-center items-center relative align-middle",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded",
      },
      size: {
        default: "h-10 min-w-10 text-xl",
        sm: "h-8 min-w-8 text-sm",
        lg: "h-16 min-w-16 text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "circle",
      size: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * @en Whether to automatically adjust the font size according to the size of the avatar.
   * @defaultValue true
   */
  autoFixFontSize?: boolean
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, variant, shape, size, autoFixFontSize, children, ...props },
    ref
  ) => {
    const textRef = React.useRef(null)

    React.useEffect(() => {
      if (autoFixFontSize) {
        autoFixFontSizeHandler()
      }
    }, [size, children])

    // auto adjust font size
    function autoFixFontSizeHandler() {
      if (textRef.current) {
        const textWidth = textRef.current.clientWidth
        const size = props.size || avatarRef.current.offsetWidth
        const scale = size / (textWidth + 8)

        if (size && scale < 1) {
          textRef.current.style.transform = `scale(${scale}) translateX(-50%)`
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ variant, shape, size }), className)}
        {...props}
      >
        <span ref={textRef}>{children}</span>
      </div>
    )
  }
)
Avatar.displayName = AvatarPrimitive.Root.displayName

export { Avatar }
