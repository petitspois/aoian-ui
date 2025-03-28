import React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

export interface DropUploaderProps {
  className?: string
  getDropContainer?: null | (() => HTMLElement | null | undefined)
  children?: React.ReactNode
}

function DropArea(props: DropUploaderProps) {
  const { getDropContainer, className, children } = props

  const [container, setContainer] = React.useState<
    HTMLElement | null | undefined
  >()
  const [showArea, setShowArea] = React.useState<boolean | null>(null)

  // ========================== Container ===========================
  React.useEffect(() => {
    const nextContainer = getDropContainer?.()
    if (container !== nextContainer) {
      setContainer(nextContainer)
    }
  }, [getDropContainer])

  // ============================= Drop =============================
  React.useEffect(() => {
    // Add global drop event
    if (container) {
      const onDragEnter = () => {
        setShowArea(true)
      }

      // Should prevent default to make drop event work
      const onDragOver = (e: DragEvent) => {
        e.preventDefault()
      }

      const onDragLeave = (e: DragEvent) => {
        if (!e.relatedTarget) {
          setShowArea(false)
        }
      }
      const onDrop = (e: DragEvent) => {
        setShowArea(false)
        e.preventDefault()
      }

      document.addEventListener("dragenter", onDragEnter)
      document.addEventListener("dragover", onDragOver)
      document.addEventListener("dragleave", onDragLeave)
      document.addEventListener("drop", onDrop)
      return () => {
        document.removeEventListener("dragenter", onDragEnter)
        document.removeEventListener("dragover", onDragOver)
        document.removeEventListener("dragleave", onDragLeave)
        document.removeEventListener("drop", onDrop)
      }
    }
  }, [!!container])

  // =========================== Visible ============================
  const showDropdown = getDropContainer && container
  console.log("showDropdown", showDropdown)
  // ============================ Render ============================
  if (!showDropdown) {
    return null
  }

  return createPortal(
    <div
      className={cn("fixed inset-0 z-50", className)}
      style={{ display: showArea ? "block" : "none" }}
    >
      {children}
    </div>,
    container
  )
}

export { DropArea }
