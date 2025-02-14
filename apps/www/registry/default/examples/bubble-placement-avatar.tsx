import { Bot } from "lucide-react"

import {
  Bubble,
  BubbleAvatar,
  BubbleContent,
  BubbleWrapper,
} from "@/registry/default/ui/bubble"

export default function BubblePlacementAvatar() {
  return (
    <div className="grow space-y-4 self-start">
      <Bubble>
        <BubbleAvatar>
          <Bot size={18} />
        </BubbleAvatar>
        <BubbleWrapper>
          <BubbleContent>Good morning, how are you?</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble>
        <BubbleAvatar placeholder />
        <BubbleWrapper>
          <BubbleContent>What a beautiful day!</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble placement="end">
        <BubbleAvatar
          src="https://avatars.githubusercontent.com/u/9461149?s=48&v=4"
          alt="@petitspois"
        />
        <BubbleWrapper>
          <BubbleContent>Hi, good morning, I'm fine!</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble placement="end" avatarPlaceholder>
        <BubbleWrapper>
          <BubbleContent>Thank you!</BubbleContent>
        </BubbleWrapper>
      </Bubble>
    </div>
  )
}
