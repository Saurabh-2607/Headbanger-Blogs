import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import { Calendar, Clock, User, Tag } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tagColors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-orange-100 text-orange-800',
    'bg-pink-100 text-pink-800'
  ];

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 leading-relaxed">{post.description}</p>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
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
                className={`px-2 py-1 rounded-full text-xs font-medium ${
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
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">
              {post.subposts.length} subpost{post.subposts.length > 1 ? 's' : ''}
            </p>
            <div className="space-y-1">
              {post.subposts.slice(0, 3).map((subpost) => (
                <div key={subpost.slug} className="text-sm text-gray-500">
                  • {subpost.title}
                </div>
              ))}
              {post.subposts.length > 3 && (
                <div className="text-sm text-gray-500">
                  ... and {post.subposts.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}