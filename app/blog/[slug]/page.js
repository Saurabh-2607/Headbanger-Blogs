import { getBlogPost, getAllBlogPosts, getPreviousPost, getNextPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FileText, Hash, ArrowLeft, ArrowRight, House, BookOpen, } from 'lucide-react';
import PostNavigation from '@/components/RightSidebar';
import { getSuggestedPosts } from '@/lib/blog';
import PostSidebar from '@/components/LeftSidebar';
import ReactMarkdown from 'react-markdown';
import MDXComponents from '@/components/MDXComponents';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    openGraph: {
      images: [`/api/og/${slug}?title=${encodeURIComponent(post.title)}`],
    },
  };
}

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
        {/* Blog Post Header custom by Saurabh */}

        <div className='flex flex-col mx-auto px-2 md:px-0 md:w-[60%] gap-y-2 mb-3'>
          <div className="mb-2">
            <ol className="flex  items-center flex-wrap space-x-2">
              <li>
                <Link href="/" className="text-white/60 flex items-center gap-x-2 hover:text-white">
                  <House className='size-4' /> Home
                </Link>
              </li>
              <li className="text-white/60">/</li>
              <li>
                <Link href={`/blog/${slug}`} className="flex items-center gap-x-2 text-white">
                  <BookOpen className='size-4' /> {post.title}
                </Link>
              </li>
            </ol>
          </div>
          
          {post.coverImage && (
            <Image
              alt={post.title}
              className='object-cover object-center w-full mb-6 h-[20vh] md:h-[50vh] mx-auto'
              width={800}
              height={300}
              src={post.coverImage}
            />
          )}
          <div className=' text-2xl md:text-4xl flex-wrap w-full px-5 text-center'>{post.title}</div>
          <div className='md:flex hidden text-md text-white/75 justify-center gap-2'>
            <div className='flex justify-center items-center gap-1'> <img className='rounded-full size-4.5 opacity-100' src="https://www.headbanger.me/favicon.ico" alt={`${post.author} avatar`} />{post.author}</div>
            <div>|</div>
            <div>{formatDate(post.date)}</div>
            <div>|</div>
            <div>{post.readTime}</div>
            <div>|</div>
            <div className='flex'><FileText className='w-4 mr-1' />{post.subposts.length} subpost{post.subposts.length > 1 ? 's' : ''}</div>
          </div>

          <div className='flex flex-col md:hidden items-center text-md text-white/75 justify-center gap-1'>
            <div className='w-full border-1' />
            <div className='flex justify-center items-center gap-1'> <img className='rounded-full size-4.5 opacity-100' src="https://www.headbanger.me/favicon.ico" alt={`${post.author} avatar`} />{post.author}</div>
            <div className='w-full border-1' />
            <div className='w-full flex justify-center items-center gap-2'>
              <div className='flex'>{formatDate(post.date)}</div>
              <div>|</div>
              <div className='flex'>{post.readTime}</div>
            </div>
            <div className='w-full border-1' />
          </div>
        </div>

        <div className='flex justify-center'>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mx-auto justify-center">
              {post.tags.map((tag) => (
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

      <div className='w-full flex-row px-6 md:flex gap-8 md:mx-auto justify-center'>
        <div className='md:w-80 my-6'>
          <PostSidebar
            content={post.content}
            suggestedPosts={suggestedPosts}
          />
        </div>

        <div className='md:w-[50vw] w-full'>
          <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 items-stretch pb-6 gap-4 w-full">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="flex items-center h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-[12px] opacity-75">Previous</div>
                  <div className="font-medium text-sm">{previousPost.title}</div>
                </div>
              </Link>
            ) : (
              <div className="flex opacity-50 items-center h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div className="flex items-center opacity-50 justify-end h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                <div className="text-right">
                  <div className="text-[12px] opacity-75">Next</div>
                  <div className="font-medium text-sm">You are on the Last Post</div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </div>

          <ReactMarkdown components={MDXComponents}>{post.content}</ReactMarkdown>
          <div className='block md:hidden'>
            <PostNavigation
              mainTitle={post.title}
              mainRead={post.readTime}
              subposts={post.subposts || []}
              suggestedPosts={suggestedPosts}
            />
          </div>

          <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 items-stretch gap-4 w-full">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="flex items-center h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-[12px] opacity-75">Previous</div>
                  <div className="font-medium text-sm">{previousPost.title}</div>
                </div>
              </Link>
            ) : (
              <div className="flex opacity-50 items-center h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div className="flex items-center opacity-50 justify-end h-auto gap-2 w-full text-muted-foreground border-2 p-2 hover:text-foreground transition-colors group"                >
                <div className="text-right">
                  <div className="text-[12px] opacity-75">Next</div>
                  <div className="font-medium text-sm">You are on the Last Post</div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </div>
        </div>
        <div className='md:w-80 hidden md:block my-6'>
          <PostNavigation
            mainTitle={post.title}
            mainRead={post.readTime}
            subposts={post.subposts || []}
            suggestedPosts={suggestedPosts}
          />
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