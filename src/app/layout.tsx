import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Github, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Testing Go & MongoDB with Keploy | DevRel Assignment',
  description:
    'A practical tutorial on recording HTTP & MongoDB traffic to generate zero-code integration tests with Keploy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Minimal Nav */}
          <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-[#fafafa]/80 dark:bg-[#09090b]/80 backdrop-blur sticky top-0 z-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                <span className="text-base">🐰</span>
                <span className="text-zinc-900 dark:text-zinc-100">keploy</span>
                <span className="text-zinc-400 font-normal">/</span>
                <span className="text-xs font-mono text-zinc-500 font-normal">devrel-tutorial</span>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/keploy/keploy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>

                <a
                  href="https://docs.keploy.io"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <span>Docs</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>

                <ThemeToggle />
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main className="flex-1">{children}</main>

          {/* Minimal Footer */}
          <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-xs text-zinc-500 text-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>Keploy DevRel Candidate Assignment</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/keploy/samples-go"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-800 dark:hover:text-zinc-300"
                >
                  samples-go
                </a>
                <span>&bull;</span>
                <a
                  href="https://keploy.io"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-800 dark:hover:text-zinc-300"
                >
                  keploy.io
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
