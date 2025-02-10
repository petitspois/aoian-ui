import { docsConfig } from "@/config/docs"
import { DocsNav } from "@/components/docs-nav"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container-wrapper">
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-5">
        <aside className="fixed top-[84px] z-30 hidden h-[calc(100vh-96px)] w-full shrink-0 rounded-2xl bg-background md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto p-5">
            <DocsNav config={docsConfig} />
          </div>
        </aside>
        {children}
      </div>
    </div>
  )
}
