import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

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

export { Bubble, BubbleHeader, BubbleContent, BubbleItem, BubbleFooter }
