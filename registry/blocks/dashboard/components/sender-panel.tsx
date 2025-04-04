// @flow
import * as React from "react"
import { type Message } from "@ai-sdk/react"

import {
  Sender,
  SenderButton,
  SenderContent,
  SenderOperation,
  SenderOperationBar,
  SenderOperationBarExtra,
  SenderSearchToggle,
  SenderTextArea,
} from "@/registry/aoian-ui/sender/sender"
import { Icons } from "@/registry/blocks/dashboard/components/icons"
import { Model } from "@/registry/blocks/dashboard/lib/types/models"
import { cn } from "@/registry/lib/utils"

type SenderPanelProps = {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  messages: Message[]
  stop: () => void
  models?: Model[]
}

export function SenderPanel({
  input,
  handleInputChange,
  isLoading,
  messages,
  stop,
}: SenderPanelProps) {
  const [isSearchMode, setIsSearchMode] = React.useState(true)
  return (
    <div className={cn("m-4 flex flex-col items-center")}>
      {messages.length === 0 && (
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <Icons.logo className="size-12 text-accent-foreground" />
          <p className="text-2xl font-medium">Hello, I'm Aoian Bot</p>
        </div>
      )}
      <Sender
        placeholder="Hello? this is Aoian UI Sender"
        loading={isLoading}
        value={input}
        onAbort={stop}
        onChange={(e) => {
          handleInputChange(e)
        }}
        onSubmit={() => {}}
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
              <SenderButton />
            </SenderOperationBar>
          </SenderOperation>
        </SenderContent>
      </Sender>
    </div>
  )
}
