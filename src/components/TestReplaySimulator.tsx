'use client'

import * as React from 'react'
import { Play, RotateCcw, Terminal, CheckCircle2, XCircle, ShieldCheck, Flame, Bug } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TestReplaySimulator() {
  const [isRunning, setIsRunning] = React.useState(false)
  const [progress, setProgress] = React.useState<number>(0)
  const [simulateBug, setSimulateBug] = React.useState(false)
  const [hasRun, setHasRun] = React.useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setProgress(0)
    setHasRun(true)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 20
      })
    }, 400)
  }

  const handleReset = () => {
    setIsRunning(false)
    setProgress(0)
    setHasRun(false)
  }

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#090d16] text-slate-100 overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-[#06080e] border-b border-slate-800/90 gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-semibold text-slate-300">
            Interactive Test Replay Simulator
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Bug simulation toggle */}
          <button
            onClick={() => setSimulateBug(!simulateBug)}
            disabled={isRunning}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all border',
              simulateBug
                ? 'border-red-500/50 bg-red-500/20 text-red-300'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            )}
            title="Toggle to simulate a developer introducing a breaking bug"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>{simulateBug ? 'Bug Mode Active' : 'Simulate Regression'}</span>
          </button>

          {/* Run button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all shadow',
              isRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
            )}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run keploy test'}</span>
          </button>

          {hasRun && !isRunning && (
            <button
              onClick={handleReset}
              className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
              title="Reset simulator"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed space-y-1.5 bg-[#090d16] min-h-[220px]">
        <div className="text-slate-500">
          $ keploy test -c "docker compose up" --container-name "ginMongoApp" --delay 10
        </div>

        {progress >= 20 && (
          <div className="text-cyan-400">
            🐰 [Keploy] Initializing eBPF virtual mock router & proxy hooks...
          </div>
        )}

        {progress >= 40 && (
          <div className="text-slate-300">
            ⚡ Starting Go Gin container <span className="text-orange-400 font-semibold">ginMongoApp</span>... (MongoDB container intentionally offline)
          </div>
        )}

        {progress >= 60 && (
          <div className="text-blue-400">
            🔄 [Replayer] Executing test-set-0 : test-1 (POST /url)
            <div className="text-slate-400 pl-4">
              ↳ Intercepted outbound Mongo call: returning wire mock from mocks/mock-1.yaml
            </div>
          </div>
        )}

        {progress >= 80 && (
          <div>
            {!simulateBug ? (
              <div className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>test-1: PASSED (Status: 200, Body: 100% match) [54ms]</span>
              </div>
            ) : (
              <div className="text-red-400 flex flex-col gap-1 pl-2 border-l-2 border-red-500 my-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>test-1: FAILED (Regression Detected!)</span>
                </div>
                <div className="text-[11px] text-slate-300 pl-5">
                  - Expected status: 200 OK<br />
                  + Actual status: 500 Internal Server Error<br />
                  Diff in body: "database connection timeout"
                </div>
              </div>
            )}
          </div>
        )}

        {progress >= 100 && (
          <div className="mt-3 pt-3 border-t border-slate-800">
            {!simulateBug ? (
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ALL TESTS PASSED (1/1)</span>
                </div>
                <div className="text-[11px] text-slate-300 flex flex-wrap gap-x-4">
                  <span>Replay Duration: 1.12s</span>
                  <span>Code Coverage: 84.6%</span>
                  <span>Live DB required: 0 (100% Mocked)</span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 text-red-300 space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span>TEST SUITE FAILED (0/1 Passed)</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Keploy caught breaking changes before production!
                </div>
              </div>
            )}
          </div>
        )}

        {!hasRun && (
          <div className="text-slate-500 italic py-6 text-center">
            Click "Run keploy test" above to simulate replay execution...
          </div>
        )}
      </div>
    </div>
  )
}
