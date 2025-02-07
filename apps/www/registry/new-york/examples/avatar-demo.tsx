import { ChevronRight } from "lucide-react"

import { Avatar } from "@/registry/new-york/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="space-x-4">
      <Avatar>A</Avatar>
      <Avatar className="bg-blue-400 text-white">
        <ChevronRight />
      </Avatar>
      <Avatar className="bg-purple-400 text-white">Aoian</Avatar>
      <Avatar className="bg-pink-300 text-white">aoianui</Avatar>
    </div>
  )
}
