import {
  Bubble,
  BubbleContent,
  BubbleWrapper,
} from "@/registry/default/ui/bubble"

export default function BubbleDemo() {
  return (
    <Bubble>
      <BubbleWrapper>
        <BubbleContent>hello world !</BubbleContent>
      </BubbleWrapper>
    </Bubble>
  )
}
