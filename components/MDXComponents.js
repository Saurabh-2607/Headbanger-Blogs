import { DynamicMDXComponents } from './generated-mdx-components';

const components = {
  ...DynamicMDXComponents,
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white/90 mb-6 mt-8 leading-tight border-b border-border pb-3 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-white/85 mb-4 mt-8 leading-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-white/80 mb-3 mt-6 leading-tight">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-white/75 mb-3 mt-4 leading-tight">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-base font-semibold text-white/70 mb-2 mt-4 leading-tight">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm font-semibold text-white/65 mb-2 mt-3 leading-tight">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground leading-relaxed mb-4 text-white/60 first:mt-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-6 space-y-1 text-white/50 marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-6 space-y-1 text-white/50 marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-white/50 text-base mb-1">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/30 text-white/50 pl-6 py-3 mb-6 bg-primary/5 text-muted-foreground italic rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, className, inline }) => {
    const isInline = inline || !className;
    
    if (isInline) {
      return (
        <code className="bg-muted text-white/50 px-2 py-1 text-sm font-mono border border-border">
          {children}
        </code>
      );
    }
    
    return (
      <code className={`${className || ''} text-sm text-white/50 font-mono`}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-muted text-white/50 p-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-6 text-sm border border-border font-mono leading-relaxed">
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
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border text-white/50 border-border">
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
      className="shadow-md mb-6 max-w-full h-auto border border-border"
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
    <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border shadow-sm">
      {children}
    </kbd>
  ),
};

export default components;
