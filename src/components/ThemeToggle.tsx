'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50" />
    )
  }

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('dark')
  }

  return (
    <button
      onClick={cycleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all shadow-sm hover:shadow"
      title="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  )
}
