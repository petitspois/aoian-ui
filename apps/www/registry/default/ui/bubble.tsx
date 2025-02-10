import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
    { placement, loading, typing, onTypingComplete, className, ...props },
    ref
  ) => {
    const contextValue = React.useMemo<BubbleContextProps>(
      () => ({
        placement,
        loading,
        typing,
        onTypingComplete,
      }),
      [placement, loading, typing, onTypingComplete]
    )
    return (
      <BubbleContext.Provider value={contextValue}>
        <div
          className={cn("group/bubble-wrapper flex gap-3", className)}
          ref={ref}
          {...props}
        />
      </BubbleContext.Provider>
    )
  }
)
Bubble.displayName = "Bubble"

type BubbleAvatarProps = {
  containerClassName?: string
  className?: string
  src?: string
  alt?: string
  children?: React.ReactNode
}

const BubbleAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  BubbleAvatarProps
>(({ containerClassName, className, src, alt, children }, ref) => {
  return (
    <Avatar className={cn("h-8 w-8", containerClassName)} ref={ref}>
      {src && <AvatarImage src={src} alt={alt ?? "@aoian"} />}
      <AvatarFallback
        className={cn(
          "bg-purple-400 text-sm font-medium text-white",
          className
        )}
      >
        {children}
      </AvatarFallback>
    </Avatar>
  )
})
BubbleAvatar.displayName = "BubbleAvatar"

const BubbleHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("", className)} {...props} />
})
BubbleHeader.displayName = "BubbleHeader"

const BubbleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col", className)} {...props} />
})

const BubbleItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-chat-primary text-chat-primary-foreground rounded-xl px-4 py-3",
        className
      )}
      {...props}
    />
  )
})
BubbleItem.displayName = "BubbleItem"

const BubbleFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("bg-accent", className)} {...props} />
})
BubbleFooter.displayName = "BubbleFooter"

export {
  Bubble,
  BubbleAvatar,
  BubbleHeader,
  BubbleContent,
  BubbleItem,
  BubbleFooter,
}
