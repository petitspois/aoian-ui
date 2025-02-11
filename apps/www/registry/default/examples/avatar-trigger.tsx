import { Bird, Star } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarTrigger,
} from "@/registry/default/ui/avatar"

export default function AvatarTriggerDemo() {
  return (
    <div className={"space-x-5"}>
      <Avatar>
        <AvatarTrigger>
          <Star />
        </AvatarTrigger>
        <AvatarFallback className={"text-base"}>AA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <Bird />
        </AvatarFallback>
        <AvatarTrigger>
          <Star />
        </AvatarTrigger>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/9461149?s=48&v=4"
          alt="@petitspois"
        />
        <AvatarFallback>
          <Bird />
        </AvatarFallback>
        <AvatarTrigger className="border-secondary border">
          <Star fill={"black"} strokeWidth={0} />
        </AvatarTrigger>
      </Avatar>
    </div>
  )
}
