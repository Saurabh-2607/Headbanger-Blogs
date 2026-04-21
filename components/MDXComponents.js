import { DynamicMDXComponents } from './generated-mdx-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const components = {
  ...DynamicMDXComponents,
  h1: ({ children }) => (
    <h1 className="text-4xl font-normal font-serif text-white/90 mb-6 mt-8 leading-tight border-b border-border pb-3 first:mt-0 tracking-wide">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold font-sans text-white/90 mb-6 mt-10 leading-snug tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold font-sans text-white/85 mb-4 mt-8 leading-snug tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold font-sans text-white/80 mb-4 mt-6 leading-snug tracking-tight">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-lg font-semibold font-sans text-white/75 mb-3 mt-4 leading-snug tracking-tight">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-base font-semibold font-sans text-white/70 mb-3 mt-4 leading-snug tracking-tight">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-base md:text-lg text-white/80 leading-[1.8] tracking-wide mb-6 first:mt-0 font-sans">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-8 space-y-3 text-white/80 marker:text-primary font-sans text-base md:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-8 space-y-3 text-white/80 marker:text-primary font-sans text-base md:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-[1.8] tracking-wide text-white/80">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/50 text-white/80 pl-6 py-4 mb-8 bg-primary/5 text-lg md:text-xl italic rounded-r-lg font-sans leading-[1.8] tracking-wide">
      {children}
    </blockquote>
  ),
  code: ({ children, className, inline, ...props }) => {
    const isInline = inline || !className;
    const match = /language-(\w+)/.exec(className || '');
    
    if (isInline || !match) {
      return (
        <code className={`${className || ''} bg-muted text-white/90 px-1.5 py-0.5 text-[16px] md:text-[18px] font-[family-name:var(--font-dm-mono)] border border-border rounded-md mx-0.5 whitespace-pre-wrap break-words`} {...props}>
          {children}
        </code>
      );
    }
    
    return (
      <SyntaxHighlighter
        {...props}
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        customStyle={{
          margin: 0,
          background: 'transparent',
          padding: 0,
          overflowX: 'auto',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '18px',
            lineHeight: '1.7',
          }
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-neutral-900 border-neutral-800 text-white/90 p-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-8 border font-[family-name:var(--font-dm-mono)] text-[18px] leading-[1.7] rounded-xl tracking-wide" {...props}>
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 text-white/50 underline underline-offset-2 transition-colors font-medium"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white/50">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-white/50">
      {children}
    </em>
  ),
  hr: () => (
    <hr className="border-border text-white/50 my-8" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-border">
      <table className="min-w-full text-white/50">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-muted/50">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-muted-foreground">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <img 
      src={src} 
      alt={alt} 
      className="shadow-md mb-6 max-w-full h-auto border border-border rounded-xl"
    />
  ),
  dl: ({ children }) => (
    <dl className="mb-6 space-y-2">
      {children}
    </dl>
  ),
  dt: ({ children }) => (
    <dt className="font-semibold text-foreground">
      {children}
    </dt>
  ),
  dd: ({ children }) => (
    <dd className="ml-4 text-muted-foreground mb-2">
      {children}
    </dd>
  ),
  kbd: ({ children }) => (
    <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border shadow-sm rounded-md">
      {children}
    </kbd>
  ),
};

export default components;
