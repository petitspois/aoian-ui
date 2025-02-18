"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useTypedEffect } from "@/registry/default/hooks/use-typed-effect"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarTrigger,
} from "@/registry/default/ui/avatar"
import { Loading } from "@/registry/default/ui/loading"

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
  onUpdate?: VoidFunction
  onTypingComplete?: VoidFunction
  className?: string
  avatarPlaceholder?: boolean
  messageRender?: (content: string) => React.ReactNode
}

type TypingConfigProps = {
  typingConfig: [
    enableTyping: boolean,
    step: number,
    interval: number,
    suffix: React.ReactNode | null
  ]
}

const BubbleContext = React.createContext<
  (BubbleContextProps & TypingConfigProps) | null
>(null)

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
      messageRender,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const typingConfig = React.useMemo<
      TypingConfigProps["typingConfig"]
    >(() => {
      if (!typing) {
        return [false, 0, 0, null]
      }
      let baseConfig: Required<TypingOption> = {
        step: 1,
        interval: 50,
        // set default suffix is empty
        suffix: null,
      }
      if (typeof typing === "object") {
        baseConfig = { ...baseConfig, ...typing }
      }
      return [true, baseConfig.step, baseConfig.interval, baseConfig.suffix]
    }, [typing])

    const contextValue = React.useMemo<BubbleContextProps & TypingConfigProps>(
      () => ({
        placement,
        avatarPlaceholder,
        loading,
        typing,
        typingConfig,
        messageRender,
        onTypingComplete,
      }),
      [
        placement,
        loading,
        typing,
        onTypingComplete,
        avatarPlaceholder,
        typingConfig,
        messageRender,
      ]
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
      return <div className={cn("invisible h-8 w-8", className)}></div>
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
            <Loading size="sm" className="gap-px" itemClassName="bg-white" />
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
      className={cn("text-chat-foreground mb-1 text-sm", className)}
      {...props}
    />
  )
})
BubbleHeader.displayName = "BubbleHeader"

const BubbleFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("mt-2 text-sm", className)} {...props} />
})
BubbleFooter.displayName = "BubbleFooter"

const BubbleWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex min-w-0 max-w-full flex-col", className)}
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
      shadow: "dark:bg-chat-bubble shadow",
      borderless: "border-none px-0 py-0",
    },
    shape: {
      default: "rounded-xl",
      round: "rounded-[calc(20px/2+12px)]",
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
    VariantProps<typeof bubbleContentVariants> {
  loading?: boolean
}

const BubbleContent = React.forwardRef<HTMLDivElement, BubbleContentProps>(
  ({ className, variant, shape, loading, children, ...props }, ref) => {
    const {
      placement,
      typingConfig,
      onUpdate,
      onTypingComplete,
      messageRender,
    } = useBubble()
    const [typingEnabled, typingStep, typingInterval, customSuffix] =
      typingConfig
    // ============================ Typing ============================
    const [typedContent, isTyping] = useTypedEffect(
      children,
      typingEnabled,
      typingStep,
      typingInterval
    )

    React.useEffect(() => {
      onUpdate?.()
    }, [typedContent])

    const triggerTypingCompleteRef = React.useRef(false)
    React.useEffect(() => {
      if (!isTyping && !loading) {
        // StrictMode will trigger this twice,
        // So we need a flag to avoid that
        if (!triggerTypingCompleteRef.current) {
          triggerTypingCompleteRef.current = true
          onTypingComplete?.()
        }
      } else {
        triggerTypingCompleteRef.current = false
      }
    }, [isTyping, loading])

    // =========================== Content ============================
    const mergedContent = messageRender
      ? messageRender(typedContent as any)
      : typedContent

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
      >
        {loading ? (
          <Loading itemClassName="bg-chat-bubble-foreground" className="h-5" />
        ) : (
          <>
            {mergedContent}
            {isTyping && customSuffix}
          </>
        )}
      </div>
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
