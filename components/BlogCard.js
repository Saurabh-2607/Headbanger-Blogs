import Link from 'next/link';
import { Calendar, Clock, User, Hash } from 'lucide-react';

export default function BlogCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-dashed border-border">
      <div className="p-4">
        <div className="mb-3">
          <h2 className="text-lg font-bold text-foreground mb-2 hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
        </div>

        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-3 gap-3">
          <div className="flex items-center gap-1 opacity-75">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center gap-1 opacity-75">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-1 opacity-75">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag} 
                className="px-2 py-1 text-xs text-white/75 bg-[#1a1815] font-medium"
              >
                <Hash className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.subposts && post.subposts.length > 0 && (
          <div className="border-t border-border pt-3">
            <p className="text-sm text-muted-foreground mb-2">
              {post.subposts.length} subpost{post.subposts.length > 1 ? 's' : ''}
            </p>
            <div className="space-y-0.5">
              {post.subposts.slice(0, 3).map((subpost) => (
                <div key={subpost.slug} className="text-xs text-muted-foreground opacity-75">
                  - {subpost.title}
                </div>
              ))}
              {post.subposts.length > 3 && (
                <div className="text-xs text-muted-foreground opacity-75">
                  ... and {post.subposts.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
