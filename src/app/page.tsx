import TutorialContent from '@/content/tutorial.mdx'
import { TableOfContents } from '@/components/TableOfContents'
import {
  BookOpen,
  Terminal,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  CheckCircle2,
} from 'lucide-react'

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white via-orange-50/20 to-transparent dark:from-[#0f1422] dark:via-[#090d16] dark:to-transparent p-6 sm:p-10 shadow-lg overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20">
              <Zap className="w-3.5 h-3.5" />
              DevRel Technical Tutorial
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
              Go 1.20+
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
              Gin & MongoDB
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              eBPF Zero-Code
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15]">
            Mastering Zero-Code Integration Testing for Go with Keploy
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            A beginner-friendly, hands-on walkthrough demonstrating how Keploy intercepts network packets at the OS level to record real API calls and database wire mocks into Git-versioned test suites.
          </p>

          {/* Quick Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 text-[11px]">Mock Boilerplate</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                0 Lines of Code
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 text-[11px]">Interception Level</div>
              <div className="font-bold text-orange-600 dark:text-orange-400 text-sm mt-0.5">
                eBPF / TCP Sockets
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 text-[11px]">Testing Isolation</div>
              <div className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5">
                100% (No DB needed)
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 text-[11px]">Time to First Test</div>
              <div className="font-bold text-purple-600 dark:text-purple-400 text-sm mt-0.5">
                Under 3 Minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Right Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left / Center: Article Content */}
        <article className="flex-1 min-w-0 max-w-full prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-code:font-mono">
          <TutorialContent />
        </article>

        {/* Right: Sticky Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  )
}
