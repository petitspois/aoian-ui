import * as React from "react"
import markdownit from "markdown-it"

import {
  Bubble,
  BubbleContent,
  BubbleWrapper,
} from "@/registry/default/ui/bubble"

const md = markdownit({ html: true, breaks: true })

const text = `
> Render as markdown content to show rich text!

Link: [Aoian UI](https://ui.aoian.chat)
`.trim()

const renderMarkdown = (content: string) => (
  <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
)

export default function BubbleContentRender() {
  const [renderKey, setRenderKey] = React.useState(0)

  React.useEffect(() => {
    const id = setTimeout(() => {
      setRenderKey((prev) => prev + 1)
    }, text.length * 100 + 2000)

    return () => {
      clearTimeout(id)
    }
  }, [renderKey])
  return (
    <div key={renderKey}>
      <Bubble typing messageRender={renderMarkdown}>
        <BubbleWrapper>
          <BubbleContent>{text}</BubbleContent>
        </BubbleWrapper>
      </Bubble>
    </div>
  )
}
