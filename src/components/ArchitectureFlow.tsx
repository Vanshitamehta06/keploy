'use client'

import * as React from 'react'
import { ArrowRight, Database, Terminal, Cpu, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NodeDetail {
  id: 'client' | 'keploy' | 'db'
  title: string
  subtitle: string
  port: string
  protocol: string
  recordDesc: string
  testDesc: string
  technicalNote: string
}

const nodeDetails: Record<'client' | 'keploy' | 'db', NodeDetail> = {
  client: {
    id: 'client',
    title: 'HTTP Client (cURL / Postman)',
    subtitle: 'Traffic Initiator & Contract Validator',
    port: 'Port :8080 (Ingress)',
    protocol: 'HTTP/1.1 REST',
    recordDesc: 'You send real HTTP requests (e.g. POST /url with {"url": "https://keploy.io"}). Keploy transparently captures the headers, method, URL, and body.',
    testDesc: 'Keploy’s test runner replaces the client. It reads test-1.yaml and replays the exact HTTP request into your running Go Gin application.',
    technicalNote: 'Zero mock configuration needed. Keploy records the actual response returned by Gin and saves it as the expected test assertion.',
  },
  keploy: {
    id: 'keploy',
    title: 'Keploy eBPF & Socket Proxy',
    subtitle: 'Kernel-Level Interceptor (Zero Code Changes)',
    port: 'Transparent OS Hook',
    protocol: 'eBPF / Raw TCP Sockets',
    recordDesc: 'Hooks into Linux network sockets using eBPF probes. It sniffs incoming HTTP traffic on port 8080 and outbound MongoDB traffic on port 27017, serializing both into YAML on disk.',
    testDesc: 'Intercepts the Go MongoDB driver socket calls. Instead of letting packets reach MongoDB, Keploy feeds the recorded mock-1.yaml wire packets directly to the driver.',
    technicalNote: 'Your Go code remains 100% production-pure. No custom test handlers, no mockgen interfaces, and no dependency injection hacks required.',
  },
  db: {
    id: 'db',
    title: 'MongoDB / Virtual Mock',
    subtitle: 'Database Layer & Mock Replay',
    port: 'Port :27017 (Egress)',
    protocol: 'MongoDB Wire Protocol (BSON OP_MSG)',
    recordDesc: 'Your real MongoDB database runs and stores data. Keploy intercepts the database driver queries and records the exact BSON responses returned by Mongo into mock-1.yaml.',
    testDesc: 'MongoDB is STOPPED / OFFLINE. Keploy acts as a virtual MongoDB server, serving the recorded BSON wire mock with byte-for-byte fidelity.',
    technicalNote: 'Because Keploy mocks at the TCP/BSON network layer rather than Go structs, your tests never suffer from mock drift when database drivers update.',
  },
}

export function ArchitectureFlow() {
  const [mode, setMode] = React.useState<'record' | 'test'>('record')
  const [expandedNode, setExpandedNode] = React.useState<'client' | 'keploy' | 'db' | null>('keploy')

  const toggleNode = (node: 'client' | 'keploy' | 'db') => {
    setExpandedNode(prev => (prev === node ? null : node))
  }

  const current = expandedNode ? nodeDetails[expandedNode] : null

  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f131f] p-5 sm:p-6 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Architecture Flow</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click on any of the 3 boxes below to expand its technical details
          </p>
        </div>

        {/* Mode Selector */}
        <div className="inline-flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('record')}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer',
              mode === 'record'
                ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            1. Recording Mode
          </button>
          <button
            type="button"
            onClick={() => setMode('test')}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer',
              mode === 'test'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            2. Test Replay Mode
          </button>
        </div>
      </div>

      {/* 3 Clickable Component Cards */}
      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          {/* Card 1: Client */}
          <button
            type="button"
            onClick={() => toggleNode('client')}
            className={cn(
              'w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between group shadow-sm',
              expandedNode === 'client'
                ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:border-orange-500/50'
            )}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
                <span>{expandedNode === 'client' ? 'Open' : 'Click to open'}</span>
                {expandedNode === 'client' ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {mode === 'record' ? 'HTTP Client (cURL)' : 'Keploy Replay Engine'}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                {mode === 'record' ? 'POST /url (Port :8080)' : 'Replays test-1.yaml'}
              </div>
            </div>
          </button>

          {/* Card 2: Keploy */}
          <button
            type="button"
            onClick={() => toggleNode('keploy')}
            className={cn(
              'w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between group shadow-sm',
              expandedNode === 'keploy'
                ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20'
                : 'border-orange-500/40 bg-orange-500/5 hover:border-orange-500'
            )}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="p-2 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
                <span>{expandedNode === 'keploy' ? 'Open' : 'Click to open'}</span>
                {expandedNode === 'keploy' ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Keploy eBPF & Socket Proxy
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                {mode === 'record'
                  ? 'Intercepts TCP socket & writes YAML'
                  : 'Serves mocks & validates response'}
              </div>
            </div>
          </button>

          {/* Card 3: Database */}
          <button
            type="button"
            onClick={() => toggleNode('db')}
            className={cn(
              'w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between group shadow-sm',
              expandedNode === 'db'
                ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:border-orange-500/50'
            )}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Database className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
                <span>{expandedNode === 'db' ? 'Open' : 'Click to open'}</span>
                {expandedNode === 'db' ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {mode === 'record' ? 'Live MongoDB' : 'mock-1.yaml (Virtual DB)'}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                {mode === 'record' ? 'Port :27017' : '⚡ 0 Database needed'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Expanded Accordion Details Panel */}
      {current && (
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 dark:bg-orange-500/10 p-4 sm:p-5 text-xs space-y-3 transition-all animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-orange-500/20">
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {current.title}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs ml-2">
                ({current.subtitle})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300 font-semibold">
                {current.protocol}
              </span>
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 font-mono text-[10px] font-semibold">
                {current.port}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="text-[11px] font-bold text-orange-600 dark:text-orange-400 mb-1 uppercase tracking-wider">
                Behavior in Record Mode:
              </div>
              <div>{current.recordDesc}</div>
            </div>

            <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wider">
                Behavior in Test Replay Mode:
              </div>
              <div>{current.testDesc}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Under the hood: </strong>{current.technicalNote}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
