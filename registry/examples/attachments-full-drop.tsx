import * as React from "react"
import { toast } from "sonner"

import { Switch } from "@/components/ui/switch"
import {
  Attachments,
  type AttachmentsProps,
} from "@/registry/aoian-ui/attachments/attachments"
import {
  Sender,
  SenderButton,
  SenderContent,
  SenderOperation,
  SenderOperationBar,
  SenderOperationBarExtra,
  SenderTextArea,
} from "@/registry/aoian-ui/sender/sender"

export default function AttachmentsFullDrop() {
  const [value, setValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [fullScreenDrop, setFullScreenDrop] = React.useState(false)

  const handleFileChange: AttachmentsProps["onFileChange"] = (
    acceptedFiles,
    rejectedFiles
  ) => {
    try {
      toast.success("Files:" + JSON.stringify(acceptedFiles))
      if (rejectedFiles.length > 0) {
        toast.error("Error:" + JSON.stringify(rejectedFiles))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={"w-full space-y-4"}>
      <Sender
        placeholder="Send a message..."
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
            <SenderOperationBarExtra></SenderOperationBarExtra>
            <SenderOperationBar>
              <Attachments
                fullScreenDrop={fullScreenDrop}
                onFileChange={handleFileChange}
              />
              <SenderButton />
            </SenderOperationBar>
          </SenderOperation>
        </SenderContent>
      </Sender>
      <div className="inline-flex items-center gap-2">
        <span>Full screen drop:</span>
        <Switch checked={fullScreenDrop} onCheckedChange={setFullScreenDrop} />
      </div>
    </div>
  )
}
