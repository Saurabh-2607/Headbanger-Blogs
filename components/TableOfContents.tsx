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
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-gray-700" />
        <h3 className="font-bold text-lg text-gray-900">Table of Contents</h3>
      </div>
      
      <nav className="space-y-2">
        {subposts.map((subpost) => (
          <div key={subpost.slug}>
            <Link
              href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
              className={`block p-3 rounded-md transition-colors ${
                currentSlug === subpost.slug
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="font-medium">{subpost.title}</div>
              <div className="text-sm text-gray-500 mt-1">{subpost.description}</div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
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