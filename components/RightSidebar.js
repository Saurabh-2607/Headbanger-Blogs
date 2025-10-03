'use client';

import Link from 'next/link';
import { BookOpen, FileText, File, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function PostNavigation({ mainTitle, mainRead, totalRead, subposts, currentSlug, suggestedPosts }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  // Show component if there are subposts OR suggested posts
  const hasSubposts = subposts && subposts.length > 0;
  const hasSuggestedPosts = suggestedPosts && suggestedPosts.length > 0;
  
  if (!hasSubposts && !hasSuggestedPosts) {
    return null;
  }

  const totalReadingTime = (() => {
    if (!hasSubposts) return mainRead || '';
    
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
    <>
      {/* Desktop Navigation */}
      <nav className="text-neutral-100 hidden md:block w-full sticky top-6">
        <div className='flex flex-col gap-2'>
          {hasSubposts && (
            <>
              <div className="flex items-center gap-2 hover:bg-neutral-800/25 p-2">
                <BookOpen className="w-5 h-5 text-neutral-400" />
                <div>
                  <div className="font-medium text-sm leading-tight">{mainTitle}</div>
                  <div className="text-xs text-neutral-400">
                    {mainRead} <span>({totalReadingTime} total)</span>
                  </div>
                </div>
              </div>
              {subposts.map((subpost) => {
            const isActive = currentSlug === subpost.slug;
            const IconComponent = isActive ? FileText : File;
            
            return (
              <div key={subpost.slug} className={`flex w-full p-2 items-center  ${isActive ? 'bg-neutral-800/50' : 'hover:bg-neutral-800/25'}`}>
                <Link
                  href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
                  className="items-center flex ml-1 gap-2 w-full transition-colors duration-150"
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <div className='w-full items-center'>
                    <div className={`text-left text-xs ${isActive ? 'text-white font-medium' : ''}`}>{subpost.title}</div>
                    <div className="items-center gap-1 text-[10px] text-neutral-400">
                      {subpost.readTime}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
            </>
          )}
          
          {/* Suggested Posts Section */}
          {hasSuggestedPosts && (
            <div className={`${hasSubposts ? 'mt-4 pt-4 border-t border-neutral-800' : ''}`}>
              <h3 className="text-sm font-semibold text-white mb-3">Suggested Posts</h3>
              <div className="space-y-2">
                {suggestedPosts.map((post) => (
                  <div key={post.slug} className="border border-neutral-800 p-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block transition-colors duration-150 group"
                    >
                      <div className="text-xs font-medium text-white/90 hover:text-white mb-1 line-clamp-2">
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
          )}
        </div>
      </nav>

      {/* Mobile Accordion */}
      <div className="block md:hidden w-full mb-4">
        {hasSubposts && (
          <div className="border border-neutral-800 rounded mb-4">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full flex items-center justify-between p-3 text-left text-white hover:bg-neutral-800/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-medium">Subpost ({subposts.length})</span>
              </div>
              {isAccordionOpen ? (
                <ChevronUp className="w-4 h-4 text-neutral-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              )}
            </button>
            
            {isAccordionOpen && (
              <div className="border-t border-neutral-800">
                {subposts.map((subpost, index) => {
                  const isActive = currentSlug === subpost.slug;
                  const IconComponent = isActive ? FileText : File;
                  
                  return (
                    <div key={subpost.slug} className={`border-b border-neutral-800 last:border-b-0 ${isActive ? 'bg-neutral-800/50' : ''}`}>
                      <Link
                        href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
                        className="flex items-center gap-3 p-3 w-full transition-colors duration-150 hover:bg-neutral-800/30"
                      >
                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                        <div className="flex-1">
                          <div className={`text-sm ${isActive ? 'text-white font-medium' : 'text-neutral-200'}`}>
                            {subpost.title}
                          </div>
                          <div className="text-xs text-neutral-400 mt-1">
                            {subpost.readTime}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        {/* Mobile Suggested Posts */}
        {hasSuggestedPosts && (
          <div className="border border-neutral-800 rounded">
            <div className="p-3 border-b border-neutral-800">
              <h3 className="text-sm font-semibold text-white">Suggested Posts</h3>
            </div>
            <div className="p-2 space-y-2">
              {suggestedPosts.map((post) => (
                <div key={post.slug} className="border border-neutral-700 p-2 rounded">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block transition-colors duration-150 group"
                  >
                    <div className="text-xs font-medium text-white/90 hover:text-white mb-1 line-clamp-2">
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
        )}
      </div>
    </>
  );
}
