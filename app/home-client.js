'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';
import { Search, Filter } from 'lucide-react';

export default function HomeClient({ initialBlogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const blogs = initialBlogs;
  
  const allTags = useMemo(() => {
    const tags = new Set();
    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [blogs, searchTerm, selectedTag]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo, Text, and Search */}
      <header className="bg-card shadow-sm border-b border-dashed border-border">
        <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-6 lg:hidden">
            {/* Logo and Text */}
            <div className="flex flex-col w-full items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-12 w-12"
              />
              <p className="text-base text-white/80 max-w-2xl text-center leading-relaxed tracking-wide font-sans">
                Discover insightful articles about technology, programming, and development by <a className='underline hover:text-white transition-colors' href='https://www.headbanger.me/'> Saurabh Sharma | Headbanger </a>
              </p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-dashed border-input outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground rounded-xl transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-background appearance-none border border-dashed border-input outline-none focus:ring-2 focus:ring-primary/50 text-foreground rounded-xl transition-all"
                >
                  <option value="">All categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Two Column Grid */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-8">
            {/* Left - Logo and Text */}
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="size-20 flex-shrink-0"
              />
              <div>
              <h1 className='text-3xl font-serif font-normal tracking-wide'>Headbanger Blogs</h1>

              <p className="text-base font-sans mt-2 flex-wrap w-[65%] text-white/80 leading-relaxed tracking-wide">
                Discover insightful articles about technology, programming, and development by <a className='underline hover:text-white transition-colors' href='https://www.headbanger.me/'> Saurabh Sharma | Headbanger </a>
              </p>
              </div>
            </div>

            {/* Right - Search and Filter */}
            <div className="flex flex-col gap-2 min-w-[300px] w-[25%]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-dashed border-input outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground rounded-xl transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 text-sm bg-background appearance-none border border-dashed border-input outline-none focus:ring-2 focus:ring-primary/50 text-foreground rounded-xl transition-all"
                >
                  <option value="">All categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-white/80 font-sans tracking-wide text-[15px]">
            {filteredBlogs.length === blogs.length 
              ? `Showing all ${blogs.length} articles`
              : `Found ${filteredBlogs.length} of ${blogs.length} articles`
            }
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('');
              }}
              className="mt-4 text-primary hover:text-primary/80 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
