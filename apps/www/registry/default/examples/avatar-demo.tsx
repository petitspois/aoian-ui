import { Bird, Star } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarTrigger,
} from "@/registry/default/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className={"space-x-5"}>
      <Avatar>
        <AvatarFallback className={"text-base"}>AA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <Bird />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@petitspois" />
      </Avatar>
    </div>
  )
}
