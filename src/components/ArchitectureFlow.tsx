'use client'

import * as React from 'react'
import { ArrowRight, Database, Server, Terminal, Cpu, Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ArchitectureFlow() {
  const [mode, setMode] = React.useState<'record' | 'test'>('record')

  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f131f] p-5 sm:p-6 shadow-sm">
      {/* Top Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
            Network Interception Flow
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Switch mode to see how traffic routes through the system
          </p>
        </div>

        <div className="inline-flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setMode('record')}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              mode === 'record'
                ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            1. Recording Mode
          </button>
          <button
            onClick={() => setMode('test')}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              mode === 'test'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            2. Test Replay Mode
          </button>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2">
          {/* Node 1: Client */}
          <div className="w-full md:w-1/4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-center">
            <div className="inline-flex p-2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {mode === 'record' ? 'HTTP Client (curl)' : 'Keploy Replay Engine'}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              {mode === 'record' ? 'POST /url' : 'Replays test-1.yaml'}
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:flex flex-col items-center justify-center text-slate-400 px-1">
            <span className="text-[10px] font-mono mb-1 text-slate-500">HTTP :8080</span>
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </div>

          {/* Node 2: Keploy eBPF / Proxy Interceptor */}
          <div className="w-full md:w-1/3 p-4 rounded-lg border-2 border-orange-500/40 bg-orange-500/5 text-center relative">
            <div className="inline-flex p-2 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Keploy eBPF & Socket Proxy
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
              {mode === 'record'
                ? 'Intercepts TCP socket & serializes data to YAML'
                : 'Intercepts Mongo socket & serves stored mocks'}
            </div>
            <div className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/15 text-orange-600 dark:text-orange-300 font-semibold">
              Zero code changes
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex flex-col items-center justify-center text-slate-400 px-1">
            <span className="text-[10px] font-mono mb-1 text-slate-500">BSON :27017</span>
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </div>

          {/* Node 3: Database or Virtual Mock */}
          <div className="w-full md:w-1/4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-center">
            <div className="inline-flex p-2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">
              <Database className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {mode === 'record' ? 'Live MongoDB' : 'mock-1.yaml (Virtual DB)'}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              {mode === 'record' ? 'Executes query' : '⚡ Live DB offline'}
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory footer banner */}
      <div className="rounded-lg p-3 text-xs leading-relaxed border bg-slate-50 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300">
        {mode === 'record' ? (
          <div>
            <strong className="text-orange-600 dark:text-orange-400 font-semibold">Record Mode: </strong>
            You interact with the Gin service normally. Keploy hooks into the Linux socket layer, capturing the HTTP contract (<code>test-1.yaml</code>) and the MongoDB wire messages (<code>mock-1.yaml</code>).
          </div>
        ) : (
          <div>
            <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Test Replay Mode: </strong>
            Keploy re-runs the recorded HTTP requests against your Gin app. When your Go code queries MongoDB, Keploy intercepts the TCP connection and returns the mock. <strong>MongoDB does not even need to be running.</strong>
          </div>
        )}
      </div>
    </div>
  )
}
