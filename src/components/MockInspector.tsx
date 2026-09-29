'use client'

import * as React from 'react'
import { FileText, Database, Eye, Info, Sparkles, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MockInspector() {
  const [activeFile, setActiveFile] = React.useState<'test' | 'mock'>('test')

  const testYaml = `version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: /url
    header:
      Accept: "*/*"
      Content-Type: application/json
      User-Agent: curl/8.4.0
    body: '{"url":"https://keploy.io"}'
    timestamp: 2026-09-29T14:32:10Z
  resp:
    status_code: 200
    header:
      Content-Type: application/json; charset=utf-8
    body: '{"url":"http://localhost:8080/L9x2q"}'
    status_message: OK
    proto_major: 0
    proto_minor: 0
    timestamp: 2026-09-29T14:32:11Z
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1727620330`

  const mockYaml = `version: api.keploy.io/v1beta1
kind: Mongo
name: mock-1
spec:
  metadata:
    type: config
  requests:
    - header:
        length: 85
        request_id: 4
        response_to: 0
        op_code: 2013 # OP_MSG
      message:
        flag_bits: 0
        sections:
          - document:
              insert: urls
              documents:
                - _id: 66f9660ad57088b77df7
                  url: "https://keploy.io"
                  short_code: "L9x2q"
                  created_at: 1727620330
              ordered: true
              db: keploy
  responses:
    - header:
        length: 45
        request_id: 12
        response_to: 4
        op_code: 2013
      message:
        sections:
          - document:
              n: 1
              ok: 1`

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#0c101c] text-slate-200 overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-[#080b14] border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Keploy Generated Artifact Explorer
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveFile('test')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all',
              activeFile === 'test'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>tests/test-1.yaml</span>
          </button>
          <button
            onClick={() => setActiveFile('mock')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all',
              activeFile === 'mock'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Database className="w-3.5 h-3.5" />
            <span>mocks/mock-1.yaml</span>
          </button>
        </div>
      </div>

      {/* Explanatory callout on file purpose */}
      <div className="px-5 py-3 bg-slate-900/50 border-b border-slate-800/60 text-xs text-slate-300 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
        <div>
          {activeFile === 'test' ? (
            <span>
              <strong>HTTP Test Contract:</strong> Contains the exact request sent via curl and the expected status code and body. Keploy automatically marks volatile fields (like <code>header.Date</code>) as <span className="text-orange-400 font-semibold">noise</span> to prevent false positives.
            </span>
          ) : (
            <span>
              <strong>MongoDB Wire Mock:</strong> Recorded directly at the TCP/BSON protocol layer (<code>OP_MSG 2013</code>). During replay, Keploy mocks this MongoDB response without requiring a real database!
            </span>
          )}
        </div>
      </div>

      {/* Code viewport */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto bg-[#080b14] text-slate-200">
        <pre className="whitespace-pre">
          {activeFile === 'test' ? testYaml : mockYaml}
        </pre>
      </div>

      {/* Footer key points */}
      <div className="px-4 py-2.5 bg-[#0a0e1a] border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-emerald-400">
          <Check className="w-3 h-3" /> Auto-versioned in Git
        </span>
        <span className="text-slate-500">
          Stored at: <code>./keploy/test-set-0/</code>
        </span>
      </div>
    </div>
  )
}
