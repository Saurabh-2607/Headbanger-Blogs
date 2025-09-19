import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import TableOfContents from '@/components/RightSidebar';
import MDXComponents from '@/components/MDXComponents';

export default async function SubpostPage({ params }) {
  const resolvedParams = await params;
  const { slug, subpost } = resolvedParams;
  
  const { getBlogPost, getSubPost } = await import('@/lib/blog');
  
  // Get the main blog post
  const mainPost = getBlogPost(slug);
  
  if (!mainPost) {
    notFound();
  }

  // Get the specific subpost
  const subpostData = getSubPost(slug, subpost);
  
  if (!subpostData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link href={`/blog/${slug}`} className="text-muted-foreground hover:text-primary">
                  {mainPost.title}
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">{subpostData.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
                  {subpostData.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {subpostData.description}
                </p>

                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {subpostData.readTime}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="max-w-none">
                  <ReactMarkdown components={MDXComponents}>{subpostData.content}</ReactMarkdown>
                </div>
              </div>

              {/* Navigation to other subposts */}
              <div className="p-8 border-t border-border bg-muted/30">
                <h3 className="font-bold text-lg mb-4 text-foreground">Continue Reading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mainPost.subposts?.filter(sp => sp.slug !== subpostData.slug).map((otherSubpost) => (
                    <Link
                      key={otherSubpost.slug}
                      href={`/blog/${slug}/${otherSubpost.slug}`}
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
              currentSlug={subpost}
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
