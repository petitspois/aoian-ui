import * as React from "react"
import {Bot, Copy, Ellipsis, RefreshCw} from "lucide-react"

import {
  BubbleAvatar, BubbleFooter,
  BubbleList,
  type BubbleListProps,
  type BubbleListRef,
} from "@/registry/default/ui/bubble"
import { Button } from "@/registry/default/ui/button"

const roles: BubbleListProps["roles"] = {
  ai: {
    placement: "start",
    typing: { step: 5, interval: 20 },
    className: "max-w-[600px]",
    shape: 'corner',
    avatar: (
      <BubbleAvatar>
        <Bot size={18} />
      </BubbleAvatar>
    ),
  },
  user: {
    placement: "end",
    shape: 'corner',
    avatar: (
      <BubbleAvatar
        src="https://avatars.githubusercontent.com/u/9461149?s=48&v=4"
        alt="@petitspois"
      />
    ),
  },
}

export default function BubbleListDemo() {
  const [count, setCount] = React.useState(3)
  const listRef = React.useRef<BubbleListRef>(null)
  return (
    <div className="grow space-y-4 self-start">
      <div className="space-x-2">
        <Button
          onClick={() => {
            setCount((i) => i + 1)
          }}
        >
          Add Bubble
        </Button>
        <Button
          onClick={() => {
            listRef.current?.scrollTo({ key: 0, block: "nearest" })
          }}
        >
          Scroll To First
        </Button>
      </div>
      <BubbleList
        ref={listRef}
        className="max-h-[300px]"
        roles={roles}
        items={Array.from({ length: count }).map((_, i) => {
          const isAI = !!(i % 2)
          const isLast = i === count - 1
          const content = isAI
            ? "Mock AI content. ".repeat(20)
            : "Mock user content."

          return {
            key: i,
            role: isAI ? "ai" : "user",
            content,
          }
        })}
      />
    </div>
  )
}
