import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/Callout'
import { CodeBlock } from '@/components/CodeBlock'
import { ArchitectureFlow } from '@/components/ArchitectureFlow'
import { YamlViewer } from '@/components/YamlViewer'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }) => (
      <h2
        id={id}
        className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-3 scroll-mt-20 group flex items-center"
        {...props}
      >
        <span>{children}</span>
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity text-base font-normal"
            aria-label="Permalink"
          >
            #
          </a>
        )}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3
        id={id}
        className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-200 mt-6 mb-2 scroll-mt-20"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed my-3 text-[15px]" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-5 my-3 space-y-1.5 text-zinc-700 dark:text-zinc-300 text-[15px]" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-5 my-3 space-y-1.5 text-zinc-700 dark:text-zinc-300 text-[15px]" {...props}>
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
        className="my-4 border-l-2 border-orange-500 pl-4 py-1 italic text-zinc-700 dark:text-zinc-300 text-sm"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      if (!className) {
        return (
          <code
            className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 font-mono text-xs border border-zinc-200 dark:border-zinc-700"
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
      <hr className="my-8 border-zinc-200 dark:border-zinc-800" {...props} />
    ),
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="text-orange-600 dark:text-orange-400 underline underline-offset-4 hover:text-orange-700 dark:hover:text-orange-300 font-medium text-sm"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    Callout,
    ArchitectureFlow,
    YamlViewer,
    ...components,
  }
}
