import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarTrigger,
} from "@/registry/default/ui/avatar"
import { Button } from "@/registry/default/ui/button"

export interface TypingOption {
  /**
   * @default 1
   */
  step?: number
  /**
   * @default 50
   */
  interval?: number
  /**
   * @default null
   */
  suffix?: React.ReactNode
}

type BubbleContextProps = {
  placement?: "start" | "end"
  loading?: boolean
  typing?: boolean | TypingOption
  onTypingComplete?: VoidFunction
  className?: string
  avatarPlaceholder?: boolean
}

const BubbleContext = React.createContext<BubbleContextProps | null>(null)

function useBubble() {
  const context = React.useContext(BubbleContext)
  if (context === null) {
    throw new Error("useBubble must be used within a BubbleProvider.")
  }
  return context
}

const Bubble = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BubbleContextProps
>(
  (
    {
      placement = "start",
      loading,
      typing,
      avatarPlaceholder,
      onTypingComplete,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo<BubbleContextProps>(
      () => ({
        placement,
        avatarPlaceholder,
        loading,
        typing,
        onTypingComplete,
      }),
      [placement, loading, typing, onTypingComplete, avatarPlaceholder]
    )
    return (
      <BubbleContext.Provider value={contextValue}>
        <div
          className={cn(
            "group flex gap-2 data-[placement=end]:flex-row-reverse",
            className
          )}
          ref={ref}
          data-placement={placement}
          {...props}
        >
          {avatarPlaceholder && <BubbleAvatar placeholder />}
          {children}
        </div>
      </BubbleContext.Provider>
    )
  }
)
Bubble.displayName = "Bubble"

type BubbleAvatarProps = {
  className?: string
  textClassName?: string
  triggerClassName?: string
  src?: string
  alt?: string
  loading?: boolean
  children?: React.ReactNode
  placeholder?: boolean
}
const BubbleAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  BubbleAvatarProps
>(
  (
    {
      textClassName,
      triggerClassName,
      className,
      src,
      alt,
      placeholder,
      loading,
      children,
    },
    ref
  ) => {
    if (placeholder) {
      return <div className={cn("h-8 w-8 invisible", className)}></div>
    }
    return (
      <Avatar className={cn("h-8 w-8", className)} ref={ref}>
        <AvatarImage src={src} alt={alt ?? "@aoian"} />
        <AvatarFallback
          className={cn(
            "bg-purple-400 text-sm font-medium text-white",
            textClassName
          )}
        >
          {children}
        </AvatarFallback>
        {loading && (
          <AvatarTrigger
            className={cn("h-4 w-4 [&>svg]:size-2.5", triggerClassName)}
          >
            <Star />
          </AvatarTrigger>
        )}
      </Avatar>
    )
  }
)
BubbleAvatar.displayName = "BubbleAvatar"

const BubbleHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-chat-foreground mb-1", className)}
      {...props}
    />
  )
})
BubbleHeader.displayName = "BubbleHeader"

const BubbleFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("text-sm mt-2", className)} {...props} />
})
BubbleFooter.displayName = "BubbleFooter"

const BubbleWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col min-w-0 max-w-full", className)}
      {...props}
    />
  )
})
BubbleWrapper.displayName = "BubbleWrapper"

const bubbleContentVariants = cva("text-chat-foreground px-4 py-3 text-sm", {
  variants: {
    variant: {
      filled: "bg-chat-bubble text-chat-bubble-foreground",
      outlined: "border-chat-bubble-border border",
      shadow: "shadow dark:bg-chat-bubble",
    },
    shape: {
      default: "rounded-xl",
      round: "rounded-full",
      corner: "rounded-xl",
    },
  },
  defaultVariants: {
    variant: "filled",
    shape: "default",
  },
})
export interface BubbleContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleContentVariants> {}

const BubbleContent = React.forwardRef<HTMLDivElement, BubbleContentProps>(
  ({ className, variant, shape, ...props }, ref) => {
    const { placement } = useBubble()
    return (
      <div
        ref={ref}
        className={cn(
          bubbleContentVariants({ variant, shape }),
          shape === "corner" && placement === "end" && "rounded-tr-sm",
          shape === "corner" && placement === "start" && "rounded-tl-sm",
          className
        )}
        {...props}
      />
    )
  }
)
BubbleContent.displayName = "BubbleContent"

export {
  Bubble,
  BubbleAvatar,
  BubbleHeader,
  BubbleWrapper,
  BubbleContent,
  BubbleFooter,
  useBubble,
}
