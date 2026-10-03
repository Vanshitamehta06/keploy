import TutorialContent from '@/content/tutorial.mdx'
import { TableOfContents } from '@/components/TableOfContents'

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Editorial Header */}
      <header className="mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-mono text-orange-600 dark:text-orange-400 font-medium mb-3">
          DevRel Technical Walkthrough &bull; Go + MongoDB
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          Testing Go & MongoDB with Keploy: Zero-Code Mocks
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed max-w-2xl">
          A practical look at recording real API traffic to generate deterministic test cases and MongoDB wire mocks—eliminating test boilerplate and heavy Docker setups.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-mono mt-5">
          <span>Keploy DevRel Assignment</span>
          <span>&bull;</span>
          <span>Gin Framework</span>
          <span>&bull;</span>
          <span>4 min read</span>
        </div>
      </header>

      {/* Main Content with Table of Contents */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        <article className="flex-1 min-w-0 max-w-none prose prose-zinc dark:prose-invert">
          <TutorialContent />
        </article>

        <TableOfContents />
      </div>
    </div>
  )
}
