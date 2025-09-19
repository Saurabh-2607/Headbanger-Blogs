import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';

export default function BlogCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tagColors = [
    'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    'bg-green-500/10 text-green-400 border border-green-500/20',
    'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    'bg-pink-500/10 text-pink-400 border border-pink-500/20'
  ];

  return (
    <article className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-border">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
        </div>

        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4 gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs font-medium ${
                  tagColors[index % tagColors.length]
                }`}
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.subposts && post.subposts.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              {post.subposts.length} subpost{post.subposts.length > 1 ? 's' : ''}
            </p>
            <div className="space-y-1">
              {post.subposts.slice(0, 4).map((subpost) => (
                <div key={subpost.slug} className="text-[12px] text-muted-foreground">
                  - {subpost.title}
                </div>
              ))}
              {post.subposts.length > 4 && (
                <div className="text-sm text-muted-foreground">
                  ... and {post.subposts.length - 4} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
