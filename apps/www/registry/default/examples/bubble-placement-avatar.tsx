import {
  Bubble,
  BubbleContent,
  BubbleWrapper,
} from "@/registry/default/ui/bubble"

export default function BubbleDemo() {
  return (
    <div className="grow self-start space-y-4">
      <Bubble>
        <BubbleWrapper>
          <BubbleContent>hello world !</BubbleContent>
        </BubbleWrapper>
      </Bubble>
      <Bubble placement="end">
        <BubbleWrapper>
          <BubbleContent>hello world !</BubbleContent>
        </BubbleWrapper>
      </Bubble>
    </div>
  )
}
