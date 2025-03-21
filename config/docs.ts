import { MainNavItem, SidebarNavItem } from "@/types/nav"

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Blocks",
      href: "/blocks",
    },
    {
      title: "Charts",
      href: "/charts",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Colors",
      href: "/colors",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Bubble",
          href: "/docs/components/bubble",
          items: [],
        },
        {
          title: "Prompt",
          href: "/docs/components/prompt",
          items: [],
        },
        {
          title: "Sender",
          href: "/docs/components/sender",
          items: [],
        },
        {
          title: "Attachments",
          href: "/docs/components/attachments",
          items: [],
        },
        {
          title: "Lightbox",
          href: "/docs/components/lightbox",
          items: [],
        },
      ],
    },
  ],
}
