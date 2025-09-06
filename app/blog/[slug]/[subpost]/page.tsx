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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 space-y-2">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All articles
          </Link>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">→</span>
            <Link
              href={`/blog/${params.slug}`}
              className="hover:text-gray-900 transition-colors"
            >
              {mainPost.title}
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900 font-medium">{subpost.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Article Header */}
              <div className="p-8 border-b">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Part of: {mainPost.title}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {subpost.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {subpost.description}
                </p>

                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {subpost.readTime}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8 prose prose-lg max-w-none">
                <MDXRemote source={subpost.content} components={MDXComponents} />
              </div>

              {/* Navigation to other subposts */}
              <div className="p-8 border-t bg-gray-50">
                <h3 className="font-bold text-lg mb-4">Continue Reading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mainPost.subposts?.filter(sp => sp.slug !== subpost.slug).map((otherSubpost) => (
                    <Link
                      key={otherSubpost.slug}
                      href={`/blog/${params.slug}/${otherSubpost.slug}`}
                      className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">{otherSubpost.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{otherSubpost.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
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
  const posts = getBlogPost('getting-started-react');
  if (!posts?.subposts) return [];
  
  return posts.subposts.map((subpost) => ({
    slug: posts.slug,
    subpost: subpost.slug,
  }));
}