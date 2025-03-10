import * as React from "react"
import { Eraser } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sender,
  SenderAction,
  SenderButton,
  SenderContent,
  SenderOperation,
  SenderOperationBar,
  SenderOperationBarExtra,
  SenderSearchToggle,
  SenderTextArea,
} from "@/registry/aoian-ui/sender/sender"

export default function SenderDemo() {
  const [value, setValue] = React.useState("")
  const [isSearchMode, setIsSearchMode] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Sender
      submitType="shiftEnter"
      placeholder="Press Shift + Enter to send message"
      loading={isLoading}
      value={value}
      onChange={(e) => {
        setValue(e?.target?.value)
      }}
      onSubmit={() => {
        setIsLoading(true)
        setTimeout(() => {
          toast.success(value)
          setValue("")
          setIsLoading(false)
        }, 3000)
      }}
    >
      <SenderContent>
        <SenderTextArea />
        <SenderOperation>
          <SenderOperationBarExtra>
            <SenderSearchToggle
              pressed={isSearchMode}
              onPressedChange={setIsSearchMode}
            >
              Search
            </SenderSearchToggle>
          </SenderOperationBarExtra>
          <SenderOperationBar>
            <SenderAction disabled={!value} onClick={() => setValue("")}>
              <Eraser />
            </SenderAction>
            <Separator
              orientation="vertical"
              className="h-4 w-[2px] bg-accent"
            />
            <SenderButton />
          </SenderOperationBar>
        </SenderOperation>
      </SenderContent>
    </Sender>
  )
}
