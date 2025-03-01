import { exec } from "child_process"
import { promises as fs } from "fs"
import path from "path"
import { rimraf } from "rimraf"
import { registryItemSchema, type Registry } from "shadcn/registry"
import { z } from "zod"

import { examples } from "@/registry/registry-examples"
import { hooks } from "@/registry/registry-hooks"
import { lib } from "@/registry/registry-lib"
import { ui } from "@/registry/registry-ui"

const DEPRECATED_ITEMS = ["toast"]

const registry = {
  name: "aoian/ui",
  homepage: "https://ui.aoian.chat",
  items: z.array(registryItemSchema).parse(
    [
      {
        name: "index",
        type: "registry:style",
        dependencies: [
          "tailwindcss-animate",
          "class-variance-authority",
          "lucide-react",
        ],
        registryDependencies: ["utils"],
        tailwind: {
          config: {
            plugins: [`require("tailwindcss-animate")`],
            theme: {
              extend: {
                colors: {
                  chat: {
                    DEFAULT: "hsl(var(--chat-background))",
                    foreground: "hsl(var(--chat-foreground))",
                    secondary: "hsl(var(--chat-secondary-background))",
                    "secondary-foreground":
                      "hsl(var(--chat-secondary-foreground))",
                    primary: "hsl(var(--chat-primary-background))",
                    "primary-foreground": "hsl(var(--chat-primary-foreground))",
                    border: "hsl(var(--chat-border))",
                    bubble: {
                      DEFAULT: "hsl(var(--chat-bubble-background))",
                      foreground: "hsl(var(--chat-bubble-foreground))",
                      border: "hsl(var(--chat-bubble-border))",
                    },
                  },
                },
              },
            },
          },
        },
        cssVars: {
          light: {
            "--chat-background": "225 40% 96%",
            "--chat-foreground": "235 44% 15%",
            "--chat-secondary-background": "0 0% 100%",
            "--chat-secondary-foreground": "78 89% 105%",
            "--chat-primary-background": "0 0% 100%",
            "--chat-primary-foreground": "217 71% 15%",
            "--chat-border": "217 71% 15%",
            "--chat-bubble-background": "220 13% 95%",
            "--chat-bubble-foreground": "216 15% 36%",
            "--chat-bubble-border": "230 13% 91%",
          },
          dark: {
            "--chat-background": "210 8% 9%",
            "--chat-foreground": "300 2% 92%",
            "--chat-secondary-background": "240 1% 14%",
            "--chat-secondary-foreground": "0 1% 74%",
            "--chat-primary-background": "0 0% 18%",
            "--chat-primary-foreground": "0 0% 100%",
            "--chat-border": "0 1% 28%",
            "--chat-bubble-background": "0 0% 20%",
            "--chat-bubble-foreground": "0 1% 79%",
            "--chat-bubble-border": "0 1% 28%",
          },
        },
        files: [],
      },
      ...ui,
      ...lib,
      ...examples,
      ...hooks,
    ].filter((item) => {
      return !DEPRECATED_ITEMS.includes(item.name)
    })
  ),
} satisfies Registry

async function buildRegistryIndex() {
  let index = `/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"
export const Index: Record<string, any> = {`
  for (const item of registry.items) {
    const resolveFiles = item.files?.map((file) => `${file.path}`)
    if (!resolveFiles) {
      continue
    }

    const componentPath = item.files?.[0]?.path ? `@/${item.files[0].path}` : ""

    index += `
  "${item.name}": {
    name: "${item.name}",
    description: "${item.description ?? ""}",
    type: "${item.type}",
    registryDependencies: ${JSON.stringify(item.registryDependencies)},
    files: [${item.files?.map((file) => {
      const filePath = `${typeof file === "string" ? file : file.path}`
      const resolvedFilePath = path.resolve(filePath)
      return typeof file === "string"
        ? `"${resolvedFilePath}"`
        : `{
      path: "${filePath}",
      type: "${file.type}",
      target: "${file.target ?? ""}"
    }`
    })}],
    component: ${
      componentPath
        ? `React.lazy(async () => {
      const mod = await import("${componentPath}")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    })`
        : "null"
    },
    meta: ${JSON.stringify(item.meta)},
  },`
  }

  index += `
  }`

  // Write style index.
  rimraf.sync(path.join(process.cwd(), "__registry__/index.tsx"))
  await fs.writeFile(path.join(process.cwd(), "__registry__/index.tsx"), index)
}

async function buildRegistryJsonFile() {
  // 1. Fix the path for registry items.
  const fixedRegistry = {
    ...registry,
    items: registry.items.map((item) => {
      const files = item.files?.map((file) => {
        return {
          ...file,
          path: `${file.path}`,
        }
      })

      return {
        ...item,
        files,
      }
    }),
  }

  // 2. Write the content of the registry to `registry.json`
  rimraf.sync(path.join(process.cwd(), `registry.json`))
  await fs.writeFile(
    path.join(process.cwd(), `registry.json`),
    JSON.stringify(fixedRegistry, null, 2)
  )
}

async function buildRegistry() {
  // 1. Build the registry
  await new Promise((resolve, reject) => {
    const process = exec(
      `pnpm dlx shadcn build registry.json --output ./public/r/`
    )

    process.on("exit", (code) => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })

  // 2. Replace `@/registry/aoian-ui/` with `@/components/aoian-ui/` in all files
  const files = await fs.readdir(path.join(process.cwd(), "public/r"))
  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "public/r", file),
        "utf-8"
      )

      const registryItem = JSON.parse(content)

      // Replace `@/registry/aoian-ui/` in files
      registryItem.files = registryItem.files?.map((file) => {
        if (file.content?.includes("@/registry/aoian-ui")) {
          file.content = file.content?.replaceAll(
            "@/registry/aoian-ui",
            "@/components/aoian-ui"
          )
        }
        return file
      })

      // Write the file back
      await fs.writeFile(
        path.join(process.cwd(), "public/r", file),
        JSON.stringify(registryItem, null, 2)
      )
    })
  )
}

try {
  console.log("🗂️ Building registry/__index__.tsx...")
  await buildRegistryIndex()

  console.log("💅 Building registry.json...")
  await buildRegistryJsonFile()

  console.log("🏗️ Building registry...")
  await buildRegistry()
} catch (error) {
  console.error(error)
  process.exit(1)
}
