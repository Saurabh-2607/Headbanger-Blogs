import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import ReactMarkdown from 'react-markdown';

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all articles
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
              {/* Article Header */}
              <div className="p-8 border-b border-border">
                <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.description}
                </p>

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
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tagColors[index % tagColors.length]
                        }`}
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-pre:bg-muted prose-blockquote:text-muted-foreground prose-blockquote:border-border prose-hr:border-border prose-a:text-primary hover:prose-a:text-primary/80">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TableOfContents subposts={post.subposts || []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
