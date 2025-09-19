import { getBlogPost, getAllBlogPosts, getPreviousPost, getNextPost } from '@/lib/blog';
import { getContentImageUrl } from '@/lib/imageUtils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Hash, ChevronLeft, ChevronRight } from 'lucide-react';
import PostNavigation from '@/components/RightSidebar';
import { getSuggestedPosts } from '@/lib/blog';
import PostSidebar from '@/components/LeftSidebar';
import ReactMarkdown from 'react-markdown';
import MDXComponents from '@/components/MDXComponents';
import Image from 'next/image';

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const suggestedPosts = getSuggestedPosts(slug, 3);

  if (!post) {
    notFound();
  }

  const previousPost = getPreviousPost(slug);
  const nextPost = getNextPost(slug);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Blog Post Header custom by Saurabh */}

        <div className='flex flex-col gap-y-2 mb-8'>
          {post.cover && (
            <Image
              alt={post.title}
              className='object-cover object-center mb-6 h-[50vh] w-[60%] mx-auto'
              width={800}
              height={300}
              src={getContentImageUrl(slug, post.cover)}
            />
          )}
          <div className='text-4xl flex-wrap w-[50%] mx-auto text-center'>
            {post.title}
          </div>
          <div className='flex text-md text-white/75 justify-center gap-2'>
            <div className='flex justify-center items-center gap-1'> <img className='rounded-full size-4.5 opacity-100' src="https://www.headbanger.tech/favicon.ico" />{post.author}</div>
            <div>|</div>
            <div>{formatDate(post.date)}</div>
            <div>|</div>
            <div>{post.readTime}</div>
            <div>|</div>
            <div className='flex'><FileText className='w-4 mr-1' />{post.subposts.length} subpost{post.subposts.length > 1 ? 's' : ''}</div>
          </div>
          <div className='flex justify-center'>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={tag} className="px-3 py-1 text-sm text-white/75 bg-[#1a1815] font-medium">
                    <Hash className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='w-full flex gap-8 mx-auto'>

          <div className='w-80 my-6'>
            <PostSidebar
              content={post.content}
              suggestedPosts={suggestedPosts}
            />
          </div>

          <div className='w-[50vw]'>
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
              {previousPost ? (
                <Link
                  href={`/blog/${previousPost.slug}`}
                  className="flex items-center h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-[12px] opacity-75">Previous</div>
                    <div className="font-medium text-sm">{previousPost.title}</div>
                  </div>
                </Link>
              ) : (
                <div className="flex opacity-50 items-center h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-[12px] opacity-75">Previous</div>
                    <div className="font-medium text-sm">You are at the First Post</div>
                  </div>
                </div>
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex items-center justify-end h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                  <div className="text-right">
                    <div className="text-[12px] opacity-75">Next</div>
                    <div className="font-medium text-sm">{nextPost.title}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex items-center opacity-50 justify-end h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                  <div className="text-right">
                    <div className="text-[12px] opacity-75">Next</div>
                    <div className="font-medium text-sm">You are on the Last Post</div>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </div>

            <ReactMarkdown components={MDXComponents}>{post.content}</ReactMarkdown>
          </div>
          <div className='w-80 my-6'>
            <PostNavigation
              mainTitle={post.title}
              mainRead={post.readTime}
              subposts={post.subposts || []}
              suggestedPosts={suggestedPosts}
            />          </div>
        </div>

      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const posts = getAllBlogPosts();
    const params = posts.map((post) => ({
      slug: post.slug,
    }));
    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}