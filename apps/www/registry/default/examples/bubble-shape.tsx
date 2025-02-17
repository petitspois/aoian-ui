import React from "react"
import { Bot } from "lucide-react"

import {
  Bubble,
  BubbleAvatar,
  BubbleContent,
  BubbleWrapper,
} from "@/registry/default/ui/bubble"

const longText = 'This is a long text message to show the multiline view of the bubble component. '.repeat(3);

export default function BubbleShape() {
  return (
    <div className={"grow space-y-4 self-start"}>
      <Bubble>
        <BubbleWrapper>
          <BubbleContent>shape: default</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble placement="end">
        <BubbleWrapper>
          <BubbleContent className={'max-w-[500px]'}>
            {longText}
          </BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble>
        <BubbleWrapper>
          <BubbleContent shape="round">shape: round</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble placement="end">
        <BubbleWrapper>
          <BubbleContent shape="round" className={'max-w-[500px]'}>
            {longText}
          </BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble>
        <BubbleWrapper>
          <BubbleContent shape="corner">variant: corner</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble placement="end">
        <BubbleWrapper>
          <BubbleContent shape="corner" className={'max-w-[500px]'}>
            {longText}
          </BubbleContent>
        </BubbleWrapper>
      </Bubble>
    </div>
  )
}
