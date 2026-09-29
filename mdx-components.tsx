import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/Callout'
import { CodeBlock } from '@/components/CodeBlock'
import { CodeTabs } from '@/components/CodeTabs'
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram'
import { MockInspector } from '@/components/MockInspector'
import { TestReplaySimulator } from '@/components/TestReplaySimulator'
import { StepTracker } from '@/components/StepTracker'
import { FeedbackWidget } from '@/components/FeedbackWidget'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mt-8 mb-4 border-b border-slate-200 dark:border-slate-800 pb-3"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }) => (
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-12 mb-4 scroll-mt-24 flex items-center group"
        {...props}
      >
        <span>{children}</span>
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-lg"
            aria-label="Link to section"
          >
            #
          </a>
        )}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3
        id={id}
        className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-200 mt-8 mb-3 scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-lg font-semibold text-slate-900 dark:text-slate-300 mt-6 mb-2"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed my-4 text-base" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 my-4 space-y-2 text-slate-700 dark:text-slate-300 text-base" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 my-4 space-y-2 text-slate-700 dark:text-slate-300 text-base" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed pl-1" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-5 border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 pl-4 py-2 italic text-slate-700 dark:text-slate-300 rounded-r-lg"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      // Inline code
      if (!className) {
        return (
          <code
            className="px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-mono text-[13px] border border-slate-300/60 dark:border-slate-700/60"
            {...props}
          >
            {children}
          </code>
        )
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    pre: (props: any) => {
      const codeChild = props.children
      let language = 'bash'
      let rawContent = ''
      if (codeChild && codeChild.props) {
        const className = codeChild.props.className || ''
        const match = className.match(/language-(\w+)/)
        if (match) language = match[1]
        rawContent = codeChild.props.children || ''
      }
      return (
        <CodeBlock
          language={language}
          code={typeof rawContent === 'string' ? rawContent : undefined}
        >
          {codeChild}
        </CodeBlock>
      )
    },
    hr: ({ ...props }) => (
      <hr className="my-10 border-slate-200 dark:border-slate-800" {...props} />
    ),
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="text-orange-600 dark:text-orange-400 font-medium underline underline-offset-4 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    // Custom embedded components available in MDX
    Callout,
    CodeBlock,
    CodeTabs,
    ArchitectureDiagram,
    MockInspector,
    TestReplaySimulator,
    StepTracker,
    FeedbackWidget,
    ...components,
  }
}
