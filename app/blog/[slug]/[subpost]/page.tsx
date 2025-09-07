import { getBlogPost, getSubPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from '@/components/MDXComponents';

interface SubPostPageProps {
  params: {
    slug: string;
    subpost: string;
  };
}

export default function SubPostPage({ params }: SubPostPageProps) {
  const mainPost = getBlogPost(params.slug);
  const subpost = getSubPost(params.slug, params.subpost);

  if (!mainPost || !subpost) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 space-y-2">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All articles
          </Link>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-2">→</span>
            <Link
              href={`/blog/${params.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {mainPost.title}
            </Link>
            <span className="mx-2">→</span>
            <span className="text-foreground font-medium">{subpost.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
              {/* Article Header */}
              <div className="p-8 border-b border-border">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                    Part of: {mainPost.title}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                  {subpost.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {subpost.description}
                </p>

                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {subpost.readTime}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-pre:bg-muted prose-blockquote:text-muted-foreground prose-blockquote:border-border prose-hr:border-border prose-a:text-primary hover:prose-a:text-primary/80">
                  <MDXRemote source={subpost.content} components={MDXComponents} />
                </div>
              </div>

              {/* Navigation to other subposts */}
              <div className="p-8 border-t border-border bg-muted/30">
                <h3 className="font-bold text-lg mb-4 text-foreground">Continue Reading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mainPost.subposts?.filter(sp => sp.slug !== subpost.slug).map((otherSubpost) => (
                    <Link
                      key={otherSubpost.slug}
                      href={`/blog/${params.slug}/${otherSubpost.slug}`}
                      className="block p-4 bg-card rounded-lg shadow hover:shadow-md transition-shadow border border-border"
                    >
                      <h4 className="font-medium text-foreground mb-2">{otherSubpost.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{otherSubpost.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {otherSubpost.readTime}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TableOfContents 
              subposts={mainPost.subposts || []} 
              currentSlug={params.subpost}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllBlogPosts } = await import('@/lib/blog');
  const allPosts = getAllBlogPosts();
  
  const params = [];
  
  for (const post of allPosts) {
    if (post.subposts && post.subposts.length > 0) {
      for (const subpost of post.subposts) {
        params.push({
          slug: post.slug,
          subpost: subpost.slug,
        });
      }
    }
  }
  
  return params;
}