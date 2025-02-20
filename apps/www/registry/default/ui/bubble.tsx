"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Bot } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarTrigger,
} from "@/registry/default/ui/avatar"
import { Loading } from "@/registry/default/ui/loading"
import {useContext} from "react";

interface TypingOption {
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
  messageRender?: (content: string) => React.ReactNode
}

const BubbleContext = React.createContext<BubbleContextProps | null>(null)

function useBubble() {
  const context = React.useContext(BubbleContext)
  if (context === null) {
    throw new Error("useBubble must be used within a BubbleProvider.")
  }
  return context
}

interface BubbleRef {
  nativeElement: HTMLElement
}

const Bubble = React.forwardRef<
  BubbleRef,
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
    // ============================= Refs =============================
    const divRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => ({
      nativeElement: divRef.current!,
    }))

    const contextValue = React.useMemo<BubbleContextProps>(
      () => ({
        placement,
        avatarPlaceholder,
        loading,
        typing,
        messageRender,
        onTypingComplete,
      }),
      [
        placement,
        loading,
        typing,
        onTypingComplete,
        avatarPlaceholder,
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
          ref={divRef}
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
    const { placement, typing, onTypingComplete, messageRender } = useBubble()
    const [typingEnabled, typingStep, typingInterval, customSuffix] =
      useTypingConfig(typing)
     const { onUpdate } =  useContext(BubbleListContext)
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

// ============================= BubbleList =============================
interface BubbleListRef {
  nativeElement: HTMLDivElement
  scrollTo: (info: {
    offset?: number
    key?: string | number
    behavior?: ScrollBehavior
    block?: ScrollLogicalPosition
  }) => void
}

type BubbleDataType = BubbleContextProps & {
  content?: React.ReactNode
  key?: string | number
  role?: string
}

type RoleType = Partial<BubbleContextProps>

type RolesType =
  | Record<string, RoleType>
  | ((bubbleDataP: BubbleDataType, index: number) => RoleType)

interface BubbleListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  items?: BubbleDataType[]
  autoScroll?: boolean
  roles?: RolesType
}

const TOLERANCE = 1

interface BubbleListContextProps {
  onUpdate?: VoidFunction
}

const BubbleListContext = React.createContext<BubbleListContextProps>({})

const BubbleList = React.forwardRef<BubbleListRef, BubbleListProps>(
  ({ className, items, autoScroll = true, roles, ...props }, ref) => {
    // ============================= Refs =============================
    const listRef = React.useRef<HTMLDivElement>(null)

    const bubbleRefs = React.useRef<Record<string, BubbleRef>>({})

    // ============================ Typing ============================
    const [initialized, setInitialized] = React.useState(false)

    React.useEffect(() => {
      setInitialized(true)
      return () => {
        setInitialized(false)
      }
    }, [])

    // ============================= Data =============================
    const mergedData = useListData(items, roles)
    const [displayData, onTypingComplete] = useDisplayData(mergedData)

    // ============================ Scroll ============================
    // Is current scrollTop at the end. User scroll will make this false.
    const [scrollReachEnd, setScrollReachEnd] = React.useState(true)

    const [updateCount, setUpdateCount] = React.useState(0)

    const onInternalScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
      const target = e.target as HTMLElement

      setScrollReachEnd(
        target.scrollHeight -
          Math.abs(target.scrollTop) -
          target.clientHeight <=
          TOLERANCE
      )
    }

    React.useEffect(() => {
      if (autoScroll && listRef.current && scrollReachEnd) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
        })
      }
    }, [updateCount])

    // Always scroll to bottom when data change
    React.useEffect(() => {
      if (autoScroll) {

        // New date come, the origin last one is the second last one
        const lastItemKey = displayData[displayData.length - 2]?.key
        const bubbleInst = bubbleRefs.current[lastItemKey!]


        // Auto scroll if last 2 item is visible
        if (bubbleInst) {
          const { nativeElement } = bubbleInst
          const { top, bottom } = nativeElement.getBoundingClientRect()
          const { top: listTop, bottom: listBottom } =
            listRef.current!.getBoundingClientRect()


          const isVisible = top < listBottom && bottom > listTop
          if (isVisible) {
            setUpdateCount((c) => c + 1)
            setScrollReachEnd(true)
          }
        }
      }
    }, [displayData.length])

    // ========================== Outer Ref ===========================
    React.useImperativeHandle(ref, () => ({
      nativeElement: listRef.current!,
      scrollTo: ({ key, offset, behavior = "smooth", block }) => {
        if (typeof offset === "number") {
          // Offset scroll
          listRef.current!.scrollTo({
            top: offset,
            behavior,
          })
        } else if (key !== undefined) {
          // Key scroll
          const bubbleInst = bubbleRefs.current[key]

          if (bubbleInst) {
            // Block current auto scrolling
            const index = displayData.findIndex(
              (dataItem) => dataItem.key === key
            )
            setScrollReachEnd(index === displayData.length - 1)

            // Do native scroll
            bubbleInst.nativeElement.scrollIntoView({
              behavior,
              block,
            })
          }
        }
      },
    }))

    // =========================== Context ============================
    // When bubble content update, we try to trigger `autoScroll` for sync
    const onBubbleUpdate = useEvent(() => {
      if (autoScroll) {
        setUpdateCount((c) => c + 1)
      }
    })

    const context = React.useMemo(
      () => ({
        onUpdate: onBubbleUpdate,
      }),
      []
    )


    return (
      <BubbleListContext.Provider value={context}>
        <div
          {...props}
          ref={listRef}
          className={cn("flex flex-col gap-4 overflow-y-auto", className)}
          onScroll={onInternalScroll}
        >
          {displayData.map(({ key, content, ...bubble }) => (
            <Bubble
              {...bubble}
              key={key}
              ref={(node) => {
                if (node) {
                  bubbleRefs.current[key] = node
                } else {
                  delete bubbleRefs.current[key]
                }
              }}
              typing={initialized ? bubble.typing : false}
              onTypingComplete={() => {
                bubble.onTypingComplete?.()
                onTypingComplete(key)
              }}
            >
              <>
              <BubbleAvatar>
                <Bot size={18} />
              </BubbleAvatar>
              <BubbleWrapper>
                <BubbleContent>{content}</BubbleContent>
              </BubbleWrapper>
              </>
            </Bubble>
          ))}
        </div>
      </BubbleListContext.Provider>
    )
  }
)
BubbleList.displayName = "BubbleList"

// ============================= Hooks =============================
function isString(str: any): str is string {
  return typeof str === "string"
}

function useEvent<T extends Function>(callback: T): T {
  const fnRef = React.useRef<any>()
  fnRef.current = callback

  const memoFn = React.useCallback<T>(
    ((...args: any) => fnRef.current?.(...args)) as any,
    []
  )

  return memoFn
}

/**
 * Return typed content and typing status when typing is enabled.
 * Or return content directly.
 */
function useTypedEffect(
  content: React.ReactNode | object,
  typingEnabled: boolean,
  typingStep: number,
  typingInterval: number
): [typedContent: React.ReactNode | object, isTyping: boolean] {
  const [prevContent, setPrevContent] = React.useState<
    React.ReactNode | object
  >("")
  const [typingIndex, setTypingIndex] = React.useState<number>(1)

  const mergedTypingEnabled = typingEnabled && isString(content)

  // Reset typing index when content changed
  React.useLayoutEffect(() => {
    setPrevContent(content)
    if (!mergedTypingEnabled && isString(content)) {
      setTypingIndex(content.length)
    } else if (
      isString(content) &&
      isString(prevContent) &&
      content.indexOf(prevContent) !== 0
    ) {
      setTypingIndex(1)
    }
  }, [content])

  // Start typing
  React.useEffect(() => {
    if (mergedTypingEnabled && typingIndex < content.length) {
      const id = setTimeout(() => {
        setTypingIndex((prev) => prev + typingStep)
      }, typingInterval)

      return () => {
        clearTimeout(id)
      }
    }
  }, [typingIndex, typingEnabled, content])

  const mergedTypingContent = mergedTypingEnabled
    ? content.slice(0, typingIndex)
    : content

  return [
    mergedTypingContent,
    mergedTypingEnabled && typingIndex < content.length,
  ]
}

function useTypingConfig(typing?: boolean | TypingOption) {
  return React.useMemo<
    [
      enableTyping: boolean,
      step: number,
      interval: number,
      suffix: React.ReactNode
    ]
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
}

function useListData(
  items: BubbleListProps["items"],
  roles?: BubbleListProps["roles"]
) {
  const getRoleBubbleProps = React.useCallback(
    (bubble: BubbleDataType, index: number): Partial<BubbleContextProps> => {
      if (typeof roles === "function") {
        return roles(bubble, index)
      }

      if (roles) {
        return roles[bubble.role!] || {}
      }

      return {}
    },
    [roles]
  )

  return React.useMemo(
    () =>
      (items || []).map((bubbleData, i) => {
        const mergedKey = bubbleData.key ?? `preset_${i}`

        return {
          ...getRoleBubbleProps(bubbleData, i),
          ...bubbleData,
          key: mergedKey,
        }
      }),
    [items, getRoleBubbleProps]
  )
}

type ListItemType = ReturnType<typeof useListData>[number]

function useDisplayData(items: ListItemType[]) {
  const [displayCount, setDisplayCount] = React.useState(items.length)

  const displayList = React.useMemo(
    () => items.slice(0, displayCount),
    [items, displayCount]
  )

  const displayListLastKey = React.useMemo(() => {
    const lastItem = displayList[displayList.length - 1]
    return lastItem ? lastItem.key : null
  }, [displayList])

  // When `items` changed, we replaced with latest one
  React.useEffect(() => {
    if (
      displayList.length &&
      displayList.every((item, index) => item.key === items[index]?.key)
    ) {
      return
    }

    if (displayList.length === 0) {
      setDisplayCount(1)
    } else {
      // Find diff index
      for (let i = 0; i < displayList.length; i += 1) {
        if (displayList[i].key !== items[i]?.key) {
          setDisplayCount(i)
          break
        }
      }
    }
  }, [items])

  // Continue to show if last one finished typing
  const onTypingComplete = useEvent((key: string | number) => {
    if (key === displayListLastKey) {
      setDisplayCount(displayCount + 1)
    }
  })

  return [displayList, onTypingComplete] as const
}

export {
  Bubble,
  BubbleList,
  BubbleAvatar,
  BubbleHeader,
  BubbleWrapper,
  BubbleContent,
  BubbleFooter,
  useBubble,
  type BubbleListProps,
  type BubbleListRef,
}
