import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Github, BookOpen, Sparkles, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Zero-Code Testing for Go with Keploy | Gin + Mongo Quickstart Tutorial',
  description:
    'A developer-first, beginner-friendly guide to recording real HTTP & MongoDB traffic and generating deterministic integration tests in Go without writing mock boilerplate.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 selection:bg-orange-500/20 selection:text-orange-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#07090e]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              {/* Brand Logo & Title */}
              <div className="flex items-center gap-3">
                <a href="/" className="flex items-center gap-2.5 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                    🐰
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base tracking-tight">
                        keploy
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold border border-orange-500/20">
                        DevRel Assignment
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Navigation Links & Actions */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/keploy/keploy"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>keploy/keploy</span>
                </a>

                <a
                  href="https://docs.keploy.io"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Docs</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>

                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content Shell */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-[#07090e]/50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span>Built with Next.js, MDX & Tailwind CSS</span>
                <span>•</span>
                <span>Keploy DevRel Candidate Assignment</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://keploy.io"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  keploy.io
                </a>
                <a
                  href="https://github.com/keploy/samples-go"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  samples-go
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
