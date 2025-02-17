import React from "react"
import { Bot } from "lucide-react"

import {
  Bubble,
  BubbleAvatar,
  BubbleContent,
  BubbleWrapper,
} from "@/registry/default/ui/bubble"

export default function BubbleVariant() {
  return (
    <div className={"space-y-4"}>
      <Bubble>
        <BubbleAvatar>
          <Bot size={18} />
        </BubbleAvatar>
        <BubbleWrapper>
          <BubbleContent variant="filled">variant: filled</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble>
        <BubbleAvatar>
          <Bot size={18} />
        </BubbleAvatar>
        <BubbleWrapper>
          <BubbleContent variant="outlined">variant: outlined</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble>
        <BubbleAvatar>
          <Bot size={18} />
        </BubbleAvatar>
        <BubbleWrapper>
          <BubbleContent variant="shadow">variant: shadow</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble>
        <BubbleAvatar>
          <Bot size={18} />
        </BubbleAvatar>
        <BubbleWrapper>
          <BubbleContent variant="borderless">
            variant: borderless to customize
          </BubbleContent>
        </BubbleWrapper>
      </Bubble>
    </div>
  )
}
