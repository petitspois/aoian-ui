import { Bot, Copy, Ellipsis, RefreshCw } from "lucide-react"

import {
  Bubble,
  BubbleAvatar,
  BubbleContent,
  BubbleFooter,
  BubbleHeader,
  BubbleWrapper,
} from "@/registry/default/ui/bubble"
import { Button } from "@/registry/default/ui/button"

export default function BubbleLayout() {
  return (
    <Bubble>
      <BubbleAvatar>
        <Bot size={18} />
      </BubbleAvatar>
      <BubbleWrapper>
        <BubbleHeader>Aoian UI</BubbleHeader>
        <BubbleContent>Good morning, how are you?</BubbleContent>
        <BubbleFooter className={"space-x-2"}>
          <Button
            variant="ghost"
            className="text-chat-bubble-foreground h-6 w-6 !p-0"
          >
            <Copy />
          </Button>
          <Button
            variant="ghost"
            className="text-chat-bubble-foreground h-6 w-6 !p-0"
          >
            <RefreshCw />
          </Button>{" "}
          <Button
            variant="ghost"
            className="text-chat-bubble-foreground h-6 w-6 !p-0"
          >
            <Ellipsis />
          </Button>
        </BubbleFooter>
      </BubbleWrapper>
    </Bubble>
  )
}
