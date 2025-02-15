import { type Registry } from "aoian/registry"

export const hooks: Registry["items"] = [
  {
    name: "use-mobile",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-mobile.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-toast",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-toast.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-typed-effect",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-typed-effect.ts",
        type: "registry:hook",
      },
    ],
  },
]
