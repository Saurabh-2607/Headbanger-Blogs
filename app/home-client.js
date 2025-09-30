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
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-dashed border-border">
        <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">
              Discover insightful articles about technology, programming, and development by <a className='underline' href='https://www.headbanger.tech/'> Saurabh Sharma | Headbanger </a>
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card shadow-md p-6 mb-8 border border-dashed border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-dashed border-input focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 pr-8 py-2 bg-black border broder-dashed border-input text-foreground"
              >
                <option value="">All categories</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
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
