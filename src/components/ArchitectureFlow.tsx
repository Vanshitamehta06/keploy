'use client'

import * as React from 'react'
import { ArrowRight, Database, Server, Terminal, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ArchitectureFlow() {
  const [phase, setPhase] = React.useState<'record' | 'test'>('record')

  return (
    <div className="my-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm">
      {/* Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            Architecture at a Glance
          </div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
            How Keploy intercepts traffic without code changes
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
          <button
            onClick={() => setPhase('record')}
            className={cn(
              'px-3 py-1 rounded-md font-medium transition-all',
              phase === 'record'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            )}
          >
            1. Record Phase
          </button>
          <button
            onClick={() => setPhase('test')}
            className={cn(
              'px-3 py-1 rounded-md font-medium transition-all',
              phase === 'test'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            )}
          >
            2. Test Replay Phase
          </button>
        </div>
      </div>

      {/* Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-5">
        {/* Step 1 */}
        <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-zinc-400">ENTRYPOINT</div>
            <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              <span>{phase === 'record' ? 'cURL / User' : 'Keploy Replayer'}</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              {phase === 'record'
                ? 'POST /url {"url":"..."}'
                : 'Sends recorded HTTP call'}
            </p>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            :8080 HTTP
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-3.5 rounded-lg border border-orange-500/30 bg-orange-500/5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
              KERNEL HOOK
            </div>
            <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-orange-500" />
              <span>Keploy eBPF / Proxy</span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
              {phase === 'record'
                ? 'Intercepts TCP socket data before Gin handles it'
                : 'Intercepts outbound DB calls from Gin'}
            </p>
          </div>
          <div className="text-[10px] font-mono text-orange-600 dark:text-orange-400 mt-3 pt-2 border-t border-orange-500/20">
            0 code modification
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-zinc-400">APPLICATION</div>
            <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-zinc-500" />
              <span>Go Gin Server</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Standard Mongo driver calls <code>InsertOne()</code> / <code>FindOne()</code>
            </p>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            Production binary
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-zinc-400">DATA LAYER</div>
            <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-zinc-500" />
              <span>{phase === 'record' ? 'Real MongoDB' : 'Virtual Wire Mock'}</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              {phase === 'record'
                ? 'Query executes, response saved to mock-1.yaml'
                : 'Served from mock-1.yaml (MongoDB is OFF)'}
            </p>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            {phase === 'record' ? ':27017 TCP Wire' : 'Offline / Deterministic'}
          </div>
        </div>
      </div>

      {/* Summary Note */}
      <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
        {phase === 'record' ? (
          <span>
            During <strong>record</strong>, Keploy transparently captures both the ingress HTTP request/response and the egress MongoDB wire protocol packets, saving them into the <code>keploy/</code> folder.
          </span>
        ) : (
          <span>
            During <strong>test</strong>, Keploy replays the stored HTTP call to your app and mocks the MongoDB driver's network socket directly. <strong>No real database needs to be running.</strong>
          </span>
        )}
      </div>
    </div>
  )
}
