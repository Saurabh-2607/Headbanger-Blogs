import Link from 'next/link';
import { BookOpen, FileText } from 'lucide-react';

export default function PostNavigation({ mainTitle, mainRead, totalRead, subposts, currentSlug, suggestedPosts }) {
  if (!subposts || subposts.length === 0) {
    return null;
  }

  const totalReadingTime = (() => {
    const extractMinutes = (readTime) => {
      const match = typeof readTime === 'string' && readTime.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const parentMinutes = extractMinutes(mainRead);
    const subpostMinutes = subposts.reduce(
      (sum, sub) => sum + extractMinutes(sub.readTime),
      0
    );
    const total = parentMinutes + subpostMinutes;
    return `${total} min read`;
  })();

  return (
    <nav className="text-neutral-100 w-full sticky top-6">
      <div className='flex flex-col gap-2'>
        <div className="flex items-center gap-2 border border-neutral-800 p-2">
          <BookOpen className="w-5 h-5 text-neutral-400" />
          <div>
            <div className="font-medium text-sm leading-tight">{mainTitle}</div>
            <div className="text-xs text-neutral-400">
              {mainRead} <span>({totalReadingTime} total)</span>
            </div>
          </div>
        </div>
        {subposts.map((subpost) => (
          <div key={subpost.slug} className="flex w-full p-2 items-center border border-neutral-800">
            <Link
              href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
              className="items-center flex ml-1 gap-2 w-full transition-colors duration-150"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              <div className='w-full items-center'>
                <div className="text-left text-xs">{subpost.title}</div>
                <div className="items-center gap-1 text-[10px] text-neutral-400">
                  {subpost.readTime}
                </div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* Suggested Posts Section */}
        {suggestedPosts && suggestedPosts.length > 0 && (
          <>
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <h3 className="text-sm font-semibold text-white mb-3">Suggested Posts</h3>
              <div className="space-y-2">
                {suggestedPosts.map((post) => (
                  <div key={post.slug} className="border border-neutral-800 p-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block transition-colors duration-150 group"
                    >
                      <div className="text-xs font-medium text-white mb-1 group-hover:text-blue-400 line-clamp-2">
                        {post.title}
                      </div>
                      <div className="text-[10px] text-neutral-400 mb-1 line-clamp-1">
                        {post.description || 'No description available'}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-500">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
