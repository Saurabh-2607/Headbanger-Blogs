import Link from 'next/link';
import { SubPost } from '@/lib/blog';
import { List, Clock } from 'lucide-react';

interface TableOfContentsProps {
  subposts: SubPost[];
  currentSlug?: string;
}

export default function TableOfContents({ subposts, currentSlug }: TableOfContentsProps) {
  if (!subposts || subposts.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6 sticky top-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-foreground" />
        <h3 className="font-bold text-lg text-foreground">Table of Contents</h3>
      </div>
      
      <nav className="space-y-2">
        {subposts.map((subpost) => (
          <div key={subpost.slug}>
            <Link
              href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
              className={`block p-3 rounded-md transition-colors ${
                currentSlug === subpost.slug
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="font-medium">{subpost.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{subpost.description}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {subpost.readTime}
              </div>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}