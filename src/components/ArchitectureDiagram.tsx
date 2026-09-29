'use client'

import * as React from 'react'
import { ArrowRight, Database, Server, Radio, ShieldCheck, Cpu, HardDrive, RefreshCw, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ArchitectureDiagram() {
  const [mode, setMode] = React.useState<'record' | 'test'>('record')
  const [selectedNode, setSelectedNode] = React.useState<string | null>('keploy')

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-[#0d121f] dark:to-[#090d16] p-5 sm:p-7 shadow-xl overflow-hidden transition-all">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Architecture Visualizer</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            How Keploy Intercepts Traffic (eBPF & Proxies)
          </h4>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/60 self-start sm:self-auto">
          <button
            onClick={() => setMode('record')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
              mode === 'record'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>1. Record Phase</span>
          </button>
          <button
            onClick={() => setMode('test')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
              mode === 'test'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2. Test Phase</span>
          </button>
        </div>
      </div>

      {/* Mode Sub-banner */}
      <div className="mt-4 mb-6 px-4 py-2.5 rounded-lg text-xs font-medium border bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300">
        <span>
          {mode === 'record' ? (
            <>
              🔴 <strong className="text-orange-600 dark:text-orange-400">Record Mode:</strong> Make API calls. Keploy transparently hooks into network sockets to record API requests AND database calls into YAML.
            </>
          ) : (
            <>
              🟢 <strong className="text-emerald-600 dark:text-emerald-400">Test Mode:</strong> Replays recorded traffic. MongoDB is <strong>NOT</strong> needed—Keploy feeds recorded mocks to the Go app!
            </>
          )}
        </span>
        <span className="hidden sm:inline-block text-[11px] text-slate-400">Click any block to learn more</span>
      </div>

      {/* Diagram Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch my-4">
        {/* Node 1: Client */}
        <div
          onClick={() => setSelectedNode('client')}
          className={cn(
            'cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between',
            selectedNode === 'client'
              ? 'ring-2 ring-orange-500 border-orange-500 bg-orange-500/5'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                SOURCE
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            </div>
            <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {mode === 'record' ? 'cURL / User Client' : 'Keploy Replay Runner'}
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'record'
                ? 'Sends HTTP POST /url'
                : 'Pours recorded HTTP requests into Go app'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-blue-600 dark:text-blue-400">
            HTTP Port :8080
          </div>
        </div>

        {/* Node 2: Keploy Interception Layer */}
        <div
          onClick={() => setSelectedNode('keploy')}
          className={cn(
            'cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between relative overflow-hidden',
            selectedNode === 'keploy'
              ? 'ring-2 ring-orange-500 border-orange-500 bg-orange-500/10'
              : 'border-orange-500/40 bg-orange-500/5 hover:border-orange-500/80'
          )}
        >
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-16 h-16 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold">
                eBPF / PROXY HOOK
              </span>
              <Cpu className="w-4 h-4 text-orange-500" />
            </div>
            <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Keploy Engine</span>
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Kernel-level eBPF & proxy interception of all ingress/egress TCP packets.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-orange-500/20 text-[11px] font-mono text-orange-600 dark:text-orange-400">
            Zero code instrumentation
          </div>
        </div>

        {/* Node 3: Gin Application */}
        <div
          onClick={() => setSelectedNode('app')}
          className={cn(
            'cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between',
            selectedNode === 'app'
              ? 'ring-2 ring-orange-500 border-orange-500 bg-orange-500/5'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                GO SERVICE
              </span>
              <Server className="w-4 h-4 text-cyan-500" />
            </div>
            <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              Gin Web Server
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Executes business logic, generates short URLs, calls Mongo driver.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
            go.mongodb.org/mongo-driver
          </div>
        </div>

        {/* Node 4: MongoDB or Mock Store */}
        <div
          onClick={() => setSelectedNode('database')}
          className={cn(
            'cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between',
            selectedNode === 'database'
              ? 'ring-2 ring-orange-500 border-orange-500 bg-orange-500/5'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className={cn(
                  'text-[10px] font-mono px-2 py-0.5 rounded font-semibold',
                  mode === 'record'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                )}
              >
                {mode === 'record' ? 'REAL DATABASE' : 'MOCK REPLAY'}
              </span>
              <Database
                className={cn(
                  'w-4 h-4',
                  mode === 'record' ? 'text-emerald-500' : 'text-purple-400'
                )}
              />
            </div>
            <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              {mode === 'record' ? 'MongoDB (Port 27017)' : 'Virtual Mock Engine'}
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'record'
                ? 'Stores real data; queries intercepted into mocks.yaml'
                : 'Simulates MongoDB responses without DB running!'}
            </p>
          </div>
          <div
            className={cn(
              'mt-4 pt-3 border-t text-[11px] font-mono',
              mode === 'record'
                ? 'border-slate-100 dark:border-slate-800 text-emerald-600 dark:text-emerald-400'
                : 'border-purple-500/20 text-purple-500 dark:text-purple-400'
            )}
          >
            {mode === 'record' ? 'Real writes & reads' : '⚡ 0 live DB needed'}
          </div>
        </div>
      </div>

      {/* Selected Node Details Box */}
      <div className="mt-4 p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs leading-relaxed">
        {selectedNode === 'client' && (
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Client / Replayer: </span>
            {mode === 'record'
              ? 'When you run curl or use Postman, you make standard HTTP calls to the Gin server. You do not need any special headers or auth for Keploy.'
              : 'In test mode, Keploy’s runner sends the recorded HTTP requests one by one to the Gin server and records the actual response.'}
          </div>
        )}
        {selectedNode === 'keploy' && (
          <div>
            <span className="font-bold text-orange-600 dark:text-orange-400">eBPF Interceptor & Proxy: </span>
            Unlike traditional SDKs that require modifying Go source code or wrapping http.Handlers, Keploy uses Linux eBPF (extended Berkeley Packet Filter) or user-space proxy routing. It intercepts TCP socket calls at the OS kernel level. This means your Go code remains 100% production pure.
          </div>
        )}
        {selectedNode === 'app' && (
          <div>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">Gin Go Application: </span>
            Your application runs completely unaware that it is being tested or recorded. When it calls the official MongoDB Go driver (go.mongodb.org/mongo-driver/mongo), socket writes are routed seamlessly through Keploy.
          </div>
        )}
        {selectedNode === 'database' && (
          <div>
            <span className="font-bold text-purple-600 dark:text-purple-400">Database & Mock Engine: </span>
            {mode === 'record'
              ? 'During recording, queries hit your live MongoDB container so real data is created. Keploy serializes the exact wire protocol responses into mock-1.yaml.'
              : 'During testing, Keploy acts as a virtual MongoDB server! Even if MongoDB is shut down or your laptop is offline on an airplane, tests pass with 100% fidelity.'}
          </div>
        )}
      </div>
    </div>
  )
}
