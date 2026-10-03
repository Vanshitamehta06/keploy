import TutorialContent from '@/content/tutorial.mdx'
import { TableOfContents } from '@/components/TableOfContents'

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Article Header */}
      <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800/80">
        <div className="text-xs font-mono text-orange-600 dark:text-orange-400 font-medium mb-3">
          DevRel Technical Walkthrough &bull; Go + MongoDB
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          Testing Go & MongoDB with Keploy: Zero-Code Mocks
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 leading-relaxed max-w-3xl">
          A practical guide to recording live HTTP traffic and auto-generating deterministic test cases and MongoDB wire mocks—without writing mock boilerplate or running test databases.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mt-5">
          <span>Keploy DevRel Assignment</span>
          <span>&bull;</span>
          <span>Gin Framework</span>
          <span>&bull;</span>
          <span>eBPF Interception</span>
          <span>&bull;</span>
          <span>4 min read</span>
        </div>
      </header>

      {/* Main Content with Table of Contents */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        <article className="flex-1 min-w-0 max-w-none prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-code:text-orange-600 dark:prose-code:text-orange-400">
          <TutorialContent />
        </article>

        <TableOfContents />
      </div>
    </div>
  )
}
