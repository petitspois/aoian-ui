import {
  Bubble,
  BubbleAvatar,
  BubbleContent,
  BubbleFooter,
  BubbleHeader,
  BubbleItem,
} from "@/registry/new-york/ui/bubble"

export default function BubbleDemo() {
  return (
    <Bubble>
      <BubbleAvatar>AA</BubbleAvatar>
      <BubbleContent>
        <BubbleHeader />
        <BubbleItem>hello world !</BubbleItem>
        <BubbleFooter />
      </BubbleContent>
    </Bubble>
  )
}
