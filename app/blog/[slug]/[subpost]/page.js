import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CornerLeftUp, FileText, ArrowLeft, ArrowRight, House, BookOpen } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostNavigation from '@/components/RightSidebar';
import PostSidebar from '@/components/LeftSidebar';
import MDXComponents from '@/components/MDXComponents';
import { getSuggestedPosts } from '@/lib/blog';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, subpost } = resolvedParams;

  const { getBlogPost, getSubPost } = await import('@/lib/blog');

  const mainPost = getBlogPost(slug);
  if (!mainPost) return {};

  const subpostData = getSubPost(slug, subpost);
  if (!subpostData) return {};

  return {
    title: subpostData.title,
    openGraph: {
      images: [`/api/og/${slug}/${subpost}?title=${encodeURIComponent(subpostData.title)}`],
    },
  };
}

export default async function SubpostPage({ params }) {
  const resolvedParams = await params;
  const { slug, subpost } = resolvedParams;

  const { getBlogPost, getSubPost, getPreviousSubPost, getNextSubPost } = await import('@/lib/blog');

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

  // Get suggested posts
  const suggestedPosts = getSuggestedPosts(slug, 3);

  // Get previous and next subposts
  const previousSubpost = getPreviousSubPost(slug, subpost);
  const nextSubpost = getNextSubPost(slug, subpost);

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
        {/* Subpost Header */}
        <div className='flex flex-col mx-auto px-2 md:px-0 md:w-[60%] gap-y-2 mb-8'>
          <div className="mb-2">
            <ol className="flex items-center flex-wrap space-x-2">
              <li>
                <Link href="/" className="text-white/60 flex items-center gap-x-2 hover:text-white">
                  <House className='size-4' /> Home
                </Link>
              </li>
              <li className="text-white/60">/</li>
              <li>
                <Link href={`/blog/${slug}`} className="text-white/60 flex items-center gap-x-2 hover:text-white">
                  <BookOpen className='size-4' /> {mainPost.title}
                </Link>
              </li>
              <li className="text-white/60">/</li>
              <li className="text-white flex items-center gap-x-2">
                <FileText className='size-4' /> {subpostData.title}
              </li>
            </ol>
          </div>

          <div className='text-3xl md:text-5xl font-normal font-serif tracking-wide flex-wrap w-full px-5 text-center leading-tight'>{subpostData.title}</div>
          <div className='md:flex hidden text-base font-sans tracking-wide text-white/80 justify-center gap-3 mt-4'>
            <div className='flex justify-center items-center gap-1.5'>
              <img className='rounded-full size-5 opacity-100 border border-white/20' src="https://www.headbanger.me/favicon.ico" alt={`${subpostData.author || mainPost.author} avatar`} />
              <span className="opacity-90">{subpostData.author || mainPost.author}</span>
            </div>
            <div className="opacity-60">|</div>
            <div className="opacity-90">{formatDate(subpostData.date || mainPost.date)}</div>
            <div className="opacity-60">|</div>
            <div className="opacity-90">{subpostData.readTime}</div>
          </div>
          <div className='flex flex-col md:hidden items-center text-[15px] font-sans tracking-wide text-white/80 justify-center gap-2 mt-4'>
            <div className='w-full border-t border-white/10' />
            <div className='flex justify-center items-center gap-1.5 py-1'>
              <img className='rounded-full size-5 flex-shrink-0 opacity-100 border border-white/20' src="https://www.headbanger.me/favicon.ico" alt={`${subpostData.author || mainPost.author} avatar`} />
              <span className="opacity-90">{subpostData.author || mainPost.author}</span>
            </div>
            <div className='w-full border-t border-white/10' />
            <div className='w-full flex justify-center items-center gap-3 py-1'>
              <div className='flex opacity-90'>{formatDate(subpostData.date || mainPost.date)}</div>
              <div className="opacity-60">|</div>
              <div className='flex opacity-90'>{subpostData.readTime}</div>
            </div>
            <div className='w-full border-t border-white/10 pb-4' />
          </div>
          
        </div>

        <div className='w-full flex-row md:flex gap-8 md:mx-auto justify-center'>
          <div className='md:w-80 my-6'>
            <PostSidebar
              content={subpostData.content}
              title={subpostData.title}
              suggestedPosts={suggestedPosts}
            />
          </div>

          <div className='md:w-[50vw] w-full'>
            <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 items-stretch gap-4 w-full mb-6">
              {previousSubpost ? (
                <Link
                  href={`/blog/${slug}/${previousSubpost.slug}`}
                  className="flex items-center h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 hover:text-foreground transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left w-full">
                    <div className="text-[12px] opacity-75">Previous</div>
                    <div className="font-medium text-sm line-clamp-2">{previousSubpost.title}</div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 opacity-50 transition-colors group">
                  <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                  <div className="text-left w-full">
                    <div className="text-[12px] opacity-75">Previous</div>
                    <div className="font-medium text-sm">No previous subpost</div>
                  </div>
                </div>
              )}

              <Link
                href={`/blog/${slug}`}
                className="flex items-center justify-center h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 hover:text-foreground transition-colors group"
              >
                <CornerLeftUp  className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-center w-full">
                  <div className="text-[12px] opacity-75">Parent Post</div>
                  <div className="font-medium text-sm line-clamp-2">{mainPost.title}</div>
                </div>
              </Link>

              {nextSubpost ? (
                <Link
                  href={`/blog/${slug}/${nextSubpost.slug}`}
                  className="flex items-center justify-end h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 hover:text-foreground transition-colors group"
                >
                  <div className="text-right w-full">
                    <div className="text-[12px] opacity-75">Next</div>
                    <div className="font-medium text-sm line-clamp-2">{nextSubpost.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex items-center justify-end h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 opacity-50 transition-colors group">
                  <div className="text-right w-full">
                    <div className="text-[12px] opacity-75">Next</div>
                    <div className="font-medium text-sm">No next subpost</div>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </div>
              )}
            </div>

            <article id="mdx-content">
              <MDXRemote source={subpostData.content} components={MDXComponents} />
            </article>
            
            <div className='block md:hidden'>
              <PostNavigation
                mainTitle={mainPost.title}
                mainRead={mainPost.readTime}
                subposts={mainPost.subposts || []}
                currentSlug={subpost}
                suggestedPosts={suggestedPosts}
              />
            </div>

            <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 items-stretch gap-4 w-full mt-6 mb-6">
              {previousSubpost ? (
                <Link
                  href={`/blog/${slug}/${previousSubpost.slug}`}
                  className="flex items-center h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 hover:text-foreground transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left w-full">
                    <div className="text-[12px] opacity-75">Previous</div>
                    <div className="font-medium text-sm line-clamp-2">{previousSubpost.title}</div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 opacity-50 transition-colors group">
                  <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                  <div className="text-left w-full">
                    <div className="text-[12px] opacity-75">Previous</div>
                    <div className="font-medium text-sm">No previous subpost</div>
                  </div>
                </div>
              )}

              <Link
                href={`/blog/${slug}`}
                className="flex items-center justify-center h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 hover:text-foreground transition-colors group"
              >
                <CornerLeftUp  className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-center w-full">
                  <div className="text-[12px] opacity-75">Parent Post</div>
                  <div className="font-medium text-sm line-clamp-2">{mainPost.title}</div>
                </div>
              </Link>

              {nextSubpost ? (
                <Link
                  href={`/blog/${slug}/${nextSubpost.slug}`}
                  className="flex items-center justify-end h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 hover:text-foreground transition-colors group"
                >
                  <div className="text-right w-full">
                    <div className="text-[12px] opacity-75">Next</div>
                    <div className="font-medium text-sm line-clamp-2">{nextSubpost.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex items-center justify-end h-auto gap-3 w-full text-muted-foreground border-2 rounded-xl p-3 px-4 opacity-50 transition-colors group">
                  <div className="text-right w-full">
                    <div className="text-[12px] opacity-75">Next</div>
                    <div className="font-medium text-sm">No next subpost</div>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </div>
              )}
            </div>

          </div>
          
          <div className='md:w-80 hidden md:block my-6'>
            <PostNavigation
              mainTitle={mainPost.title}
              mainRead={mainPost.readTime}
              subposts={mainPost.subposts || []}
              currentSlug={subpost}
              suggestedPosts={suggestedPosts}
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
