"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root asChild>
    <div
      ref={ref}
      className={cn(
        "bg-blue-500 relative inline-flex h-10 w-10 items-center whitespace-nowrap rounded-full align-middle text-xl",
        className
      )}
      {...props}
    />
  </AvatarPrimitive.Root>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <span className={"overflow-hidden rounded-full"}>
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  </span>
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full text-white",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute bg-[#e3b341] -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full [&>svg]:size-3",
      className
    )}
    {...props}
  />
))
AvatarTrigger.displayName = "AvatarTrigger"

export { Avatar, AvatarImage, AvatarFallback, AvatarTrigger }
