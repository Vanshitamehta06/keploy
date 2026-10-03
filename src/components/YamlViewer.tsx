'use client'

import * as React from 'react'
import { FileCode, Database, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function YamlViewer() {
  const [active, setActive] = React.useState<'test' | 'mock'>('test')

  const testYaml = `version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    url: /url
    header:
      Content-Type: application/json
    body: '{"url":"https://keploy.io"}'
  resp:
    status_code: 200
    header:
      Content-Type: application/json; charset=utf-8
    body: '{"url":"http://localhost:8080/L9x2q"}'
  assertions:
    noise:
      - header.Date # Keploy automatically ignores dynamic timestamps`

  const mockYaml = `version: api.keploy.io/v1beta1
kind: Mongo
name: mock-1
spec:
  metadata:
    type: config
  requests:
    - message:
        sections:
          - document:
              insert: urls
              documents:
                - url: "https://keploy.io"
                  short_code: "L9x2q"
              db: keploy
  responses:
    - message:
        sections:
          - document:
              n: 1
              ok: 1`

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActive('test')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono transition-all',
              active === 'test'
                ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            <FileCode className="w-3.5 h-3.5 text-orange-400" />
            <span>test-1.yaml (HTTP Contract)</span>
          </button>
          <button
            onClick={() => setActive('mock')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono transition-all',
              active === 'mock'
                ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>mock-1.yaml (DB Mock)</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
          ./keploy/test-set-0/
        </span>
      </div>

      <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 bg-[#09090b]">
        <pre className="whitespace-pre">
          {active === 'test' ? testYaml : mockYaml}
        </pre>
      </div>
    </div>
  )
}
