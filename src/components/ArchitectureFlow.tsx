'use client'

import * as React from 'react'
import { ArrowRight, Database, Terminal, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ArchitectureFlow() {
  const [mode, setMode] = React.useState<'record' | 'test'>('record')
  const [selectedNode, setSelectedNode] = React.useState<'client' | 'keploy' | 'db'>('keploy')

  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f131f] p-5 sm:p-6 shadow-sm">
      {/* Top Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
            Interactive Architecture Flow
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click any component below to inspect how it behaves
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
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-3 md:gap-2">
          {/* Node 1: Client */}
          <button
            type="button"
            onClick={() => setSelectedNode('client')}
            className={cn(
              'w-full md:w-1/4 p-4 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-between',
              selectedNode === 'client'
                ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-500/5 dark:bg-orange-500/10'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
            )}
          >
            <div className="flex flex-col items-center">
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
            <span className="text-[10px] font-mono text-slate-400 mt-2 block">
              {selectedNode === 'client' ? '● Active' : 'Click to inspect'}
            </span>
          </button>

          {/* Arrow 1 */}
          <div className="hidden md:flex flex-col items-center justify-center text-slate-400 px-1">
            <span className="text-[10px] font-mono mb-1 text-slate-500">HTTP :8080</span>
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </div>

          {/* Node 2: Keploy eBPF / Proxy Interceptor */}
          <button
            type="button"
            onClick={() => setSelectedNode('keploy')}
            className={cn(
              'w-full md:w-1/3 p-4 rounded-lg border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between',
              selectedNode === 'keploy'
                ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-500/10'
                : 'border-orange-500/40 bg-orange-500/5 hover:border-orange-500/70'
            )}
          >
            <div className="flex flex-col items-center">
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
            <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 mt-2 block">
              {selectedNode === 'keploy' ? '● Active' : 'Click to inspect'}
            </span>
          </button>

          {/* Arrow 2 */}
          <div className="hidden md:flex flex-col items-center justify-center text-slate-400 px-1">
            <span className="text-[10px] font-mono mb-1 text-slate-500">BSON :27017</span>
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </div>

          {/* Node 3: Database or Virtual Mock */}
          <button
            type="button"
            onClick={() => setSelectedNode('db')}
            className={cn(
              'w-full md:w-1/4 p-4 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-between',
              selectedNode === 'db'
                ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-500/5 dark:bg-orange-500/10'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
            )}
          >
            <div className="flex flex-col items-center">
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
            <span className="text-[10px] font-mono text-slate-400 mt-2 block">
              {selectedNode === 'db' ? '● Active' : 'Click to inspect'}
            </span>
          </button>
        </div>
      </div>

      {/* Dynamic Detail Card for Selected Component */}
      <div className="rounded-lg p-3.5 text-xs leading-relaxed border bg-slate-50 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all">
        {selectedNode === 'client' && (
          <div>
            <strong className="text-orange-600 dark:text-orange-400 font-semibold">
              {mode === 'record' ? 'Client Interaction: ' : 'Keploy Replayer: '}
            </strong>
            {mode === 'record'
              ? 'Sends normal HTTP requests (cURL, Postman, browser) to port 8080. Keploy captures the exact headers, query params, and JSON body without requiring any special test headers.'
              : 'Reads the recorded test contract (test-1.yaml) and fires identical HTTP requests into the Go app to verify that the responses match byte-for-byte.'}
          </div>
        )}

        {selectedNode === 'keploy' && (
          <div>
            <strong className="text-orange-600 dark:text-orange-400 font-semibold">
              eBPF & Proxy Interception: 
            </strong>
            {mode === 'record'
              ? 'Hooks directly into the Linux TCP socket layer. It observes incoming HTTP packets and outgoing MongoDB calls, serializing them into human-readable YAML contracts without modifying a single line of Go code.'
              : 'Intercepts the Go MongoDB driver socket connection. Instead of sending packets to MongoDB, Keploy feeds the stored BSON response from mock-1.yaml directly into the driver.'}
          </div>
        )}

        {selectedNode === 'db' && (
          <div>
            <strong className="text-orange-600 dark:text-orange-400 font-semibold">
              {mode === 'record' ? 'MongoDB Storage: ' : 'Virtual Mock Layer: '}
            </strong>
            {mode === 'record'
              ? 'During recording, queries hit your live MongoDB container (port 27017). Keploy captures the raw MongoDB wire response (OP_MSG BSON) into mocks/mock-1.yaml.'
              : 'MongoDB is completely stopped or offline. Keploy simulates the database transparently, enabling fast, isolated test runs in CI without Testcontainers.'}
          </div>
        )}
      </div>
    </div>
  )
}
